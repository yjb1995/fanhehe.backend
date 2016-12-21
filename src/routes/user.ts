const router = require('koa-router')();
import { Main } from '../db/mysql';

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

router.post('/register', async (ctx, next) => {
	const data: any = ctx.request.body;
	const result = await registerWithEmail(data);
	ctx.body = result;
});

router.post('/test', async (ctx, next) => {
	const result = await Main.TUser.find({where: {id: 1}}).then(data => data.dataValues);
	ctx.body = result;
});

export default router;

const registerWithEmail = async data => {
	const { email, nickname } = data;

	const result = await new Promise(resolve => {
		Main.TUser.findOrCreate({
			where: {
				email,
				nickname,
			},
			default: {
				...data,
			}
		}).then( data => {
			resolve(data);
		});
	});
	return result;
}
