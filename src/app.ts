import Koa = require('koa');
import path = require('path');
import KeyGrip = require('keygrip');

import json = require('koa-json');
import logger = require('koa-logger');
import morgan = require('koa-morgan');
import convert = require('koa-convert');
import bodyParser = require('koa-bodyparser');

import router from './routes';
import time from './middlewares/time';
import cors from './middlewares/cors';
import favicon from './middlewares/favicon';
import session  from './middlewares/session';

const app = new Koa();

app.keys = new KeyGrip(['i ams fan hehe'], 'sha256');

// 处理时间
app.use(time);
// middlewares
app.use(convert(bodyParser()));
app.use(convert(json()));
app.use(convert(logger()));
app.use(session(app));
app.use(convert(morgan('dev')));
app.use(favicon());


// cors
app.use(cors.checkOrigin);
// routes
app.use(router.routes()).use(router.allowedMethods());

app.use( (ctx, next) => {
	const error = new Error('Not Found');
	ctx.body = {
		code: 500,
		message: error.message,
		error: error.message
	}
});

module.exports = app;
