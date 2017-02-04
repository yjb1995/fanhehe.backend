import User from '../services/user/';
import resConfig from '../utils/resConfig';

import { user } from '../common/constants/request';

const router = require('koa-router')();

router.post(user.REGISTER_WITH_EMAIL.path, async (ctx, next) => {
	const { email, password, nickname } = ctx.request.body;
	const { status, data }              = await User[ user.REGISTER_WITH_EMAIL.name ] (ctx, { email, password, nickname });
	return ctx.body = resConfig(status, data);
});

router.post(user.LOGIN_WITH_EMAIL.path, async (ctx, next) => {
	const { email, password, nickname } = ctx.request.body;
	const { status, data }              = await User[ user.LOGIN_WITH_EMAIL.name ] (ctx, { email, password, session: ctx.session });
	return ctx.body =  resConfig(status, data);
});

router.get( user.LOGOUT.path, async (ctx, next) => {
	const { status, data } = await User[ user.LOGOUT.name ] (ctx, {});
	return ctx.body = resConfig(status, data);
});

router.get( user.GET_USER_INFO_BY_ID.path, async (ctx, next) => {
	const { session } = ctx;
	const { id } = ctx.query;
	const { staus, data } = await User[ user.GET_USER_INFO_BY_ID.name ] (ctx, { session, id });
	return ctx.body = resConfig(status, data);
});
export default router;
