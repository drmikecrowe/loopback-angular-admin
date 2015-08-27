module.exports = function (AppModel) {

  AppModel.observe('before save', function (ctx, next) {
    if (ctx.instance) {
      if (ctx.isNewInstance) {
        ctx.instance.created = new Date();
      }
      ctx.instance.updated = new Date();
    } else {
      ctx.data.updated = new Date();
    }
    next();
  });
};
