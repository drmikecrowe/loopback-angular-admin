#!/usr/bin/env bash

if [ -d node_modules -a ! -L node_modules ]; then
	if [ -d node_modules.real ]; then
		echo "ERROR:  node_modules.real already exists"
		exit 1
	fi
	mv node_modules node_modules.real
fi
if [ -L node_modules ]; then
	rm node_modules
fi
ln -s /dist/node_modules .
slc run $APP
