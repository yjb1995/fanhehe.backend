import User from '../services/user/';
import resConfig from '../utils/resConfig';
import { user as Actions }from '../constants/service';

const router = require('koa-router')();

router.post('/registerWithEmail', async (ctx, next) => {
	const { email, password, nickname } = ctx.request.body;
	const { status, data }              = await User[Actions.REGISTER_WITH_EMAIL](ctx, { email, password, nickname });
	return ctx.body = resConfig(status, data);
});

router.post('/loginWithEmail', async (ctx, next) => {
	const { email, password, nickname } = ctx.request.body;
	const { status, data }              = await User[Actions.LOGIN_WITH_EMAIL](ctx, { email, password, session: ctx.session });
	return ctx.body =  resConfig(status, data);
});

router.get('/logout', async (ctx, next) => {
	const { status, data } = await User[Actions.LOGOUT](ctx, {});
	return ctx.body = resConfig(status, data);
});

router.get('/userInfo/:id', async (ctx, next) => {
	const { session } = ctx;
	const { id } = ctx.params;
	const { staus, data } = await User[Actions.GET_USER_INFO_BY_ID](ctx, { session, id });
	return ctx.body = resConfig(status, data);
});
export default router;
