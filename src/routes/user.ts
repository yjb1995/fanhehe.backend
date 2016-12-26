import User from '../services/user/';
import resConfig from '../utils/resConfig';
import { user as types }from '../constants/service';

const router = require('koa-router')();

router.get('/', function (ctx, next) {
	const userId = ctx.session.user? ctx.session.user.id : '';
	const result: any = userId? { username: '1', data: {}}: "user not login";
	return ctx.body = resConfig(result.status, result.data);
});

router.post('/registerWithEmail', async (ctx, next) => {
	const { email, password, nickname } = ctx.request.body;
	const { status, data }              = await User[types.REGISTER_WITH_EMAIL]({email, password, nickname});
	return ctx.body = resConfig(status, data);
});

export default router;
