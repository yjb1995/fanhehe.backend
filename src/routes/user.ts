import { dispatch } from '../services/user';
import { user } from '../constants/service';

const router = require('koa-router')();

router.get('/', function (ctx, next) {
	const userId = ctx.session.user? ctx.session.user.id : '';
	let resData = {};
	if (userId) {
		ctx.body = {
			username: '1',
			data: {},
		};
	} else {
		ctx.body = "user not loginss";
	}
});

router.post('/registerWithEmail', async (ctx, next) => {
	let result = {};
	const { email, password, nickname } = ctx.request.body;
	
	result = await dispatch(user.REGISTER_WITH_EMAIL, {
		email,
		nickname,
		password,
	});
	
	return ctx.body = result;
});

export default router;
