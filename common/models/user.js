"use strict";

var _        = require('lodash');
var debug    = require('debug')('server:user');
var app      = require(__base + 'server/server');
var ejs      = require('ejs');
var loopback = require('loopback');

module.exports = function (user) {

  user.observe('before save', function (ctx, next) {
    if (ctx.instance) {
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = new Date();
      }
      ctx.instance.updatedAt = new Date();
    } else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });

  /* *************************************************************************************************************** */

  user.remoteMethod('updateField', {
      accepts: [
        {
          arg:         'fields',
          type:        'object',
          required:    true,
          http:        {source: 'body'},
          description: "Fields to update"
        },
        {arg: 'req', type: 'object', required: true, http: {source: 'req'}}
      ],
      returns: {arg: 'results', type: 'boolean', root: true},
      http:    {verb: 'post', path: '/updateField'}
    }
  );

  user.updateField = Bluebird.promisify(function updateField(fields, req, cb) {
    var p_userId    = req.accessToken.userId;
    var filter      = {where: {id: fields.id}};
    delete fields.id;
    var context     = loopback.getCurrentContext();
    var currentUser = context && context.get('currentUser');
    var include     = null;
    if (currentUser && !currentUser.isAdmin) {
      include = {
        relation: 'Userusers',
        scope:    {
          user: p_userId
        }
      };
      if (filter.include) {
        filter.include = [filter.include, include];
      } else {
        filter.include = include;
      }
    }
    if (filter.account > 0) {
      include = {
        relation: 'related_account',
        scope:    {
          id: parseInt(filter.account)
        }
      };
      delete filter.account;
      if (filter.include) {
        filter.include = [filter.include, include];
      } else {
        filter.include = include;
      }
    }
    debug('filter: ', filter, 'updated data: ', fields);
    var details     = _.clone(fields);
    user.findOne(filter)
      .then(function (luser) {
        if (luser) {
          _.merge(luser, fields);
          luser.save()
          var p = [
            luser.save().then(),
            app.models.Audit.upsert({
              "eventDate":    new Date(),
              "email":        currentUser.email,
              "serialnumber": luser.serialnumber,
              "devname":      luser.devname ? luser.devname : luser.serialnumber,
              "event":        "user Changed",
              "phi":          details,
              "isError":      false,
              "account":      luser.account
            }).then()
          ];
          Bluebird.all(p)
            .then(function (res) {
              cb(null, true);
            });
        } else {
          cb(null, false);
        }
      })
      .catch(function (err) {
        cb(err);
      });
  });

  /* *************************************************************************************************************** */

  user.remoteMethod('updatePassword', {
      accepts: [
        {arg: 'password', type: 'string', required: true, http: {source: 'form'}, description: 'New password'},
        {
          arg:         'confirm_password',
          type:        'string',
          required:    true,
          http:        {source: 'form'},
          description: 'Password re-typed'
        },
        {
          arg:          'access_token', type: 'object', required: true, http: function (ctx) {
          var req         = ctx && ctx.req;
          var accessToken = req && req.accessToken;
          return accessToken;
        }, description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
        }
      ],
      returns: {arg: 'user', type: 'object', root: true},
      http:    {verb: 'post', path: '/updatePassword'}
    }
  );

  user.updatePassword = Bluebird.promisify(function updatePassword(password, confirm_password, accessToken, cb) {
    if (password != confirm_password) throw new Error("Passwords do not match");
    user.findById(accessToken.userId, function (err, usr) {
      if (err) return cb(err);
      usr.updateAttribute('password', password, function (err, usr) {
        if (err) return cb(err);
        logger.info('Password reset for user ' + usr.email, logger.meta(__filename));
        cb(null, usr);
      });
    });
  });

  /* *************************************************************************************************************** */

  //send password reset link when requested
  user.on('resetPasswordRequest', function (info) {
    info.url = config.mainurl + '/reset-password';
    ejs.renderFile(__base + '/server/views/emails/password-reset.ejs', info, function (err, html) {
      user.app.models.Email.send({
        to:      info.email,
        from:    config.smtpTransportConfig.from,
        subject: 'Welcome to Livi',
        html:    html
      }, function (err) {
        if (err) {
          return logger.error([err, err.stack.split("\n")], logger.meta(__filename));
        }
        logger.info('> sending password reset email to:', info.email, logger.meta(__filename));
      });
    });

  });

};
