import Check from '../check';
import { checkEmail, checkNickname, singleOnly, multiOnly, checkPassword, checkHasLogin, checkUserInfo } from '../check/user';

import { Main } from '../../db/mysql';
import * as types from '../../constants/response';
import { user as methods} from '../../constants/service';


export default {
	/**
	 * @param  {} payload
	 * @returns
	 */
	async [methods.REGISTER_WITH_EMAIL] (ctx, data) {
		let result: any = {};
		const check = new Check(data);
		const { email, nickname } = data;

		// 处理状态 
		const { C2_REGISTER_SUCCESS, C5_REGISTER_ERROR, C4_NICKNAME_FORMAT } = types;
		// 数据检查中间件数据
		const condition = '$or';
		const checklist = ['nickname', 'email'];
		const where = checklist.map(item => ({ name: item, error: types[`C4_${item.toUpperCase()}_DUPLICATE`] }));
		//邮箱，昵唯一性检测中间件。
		const emailOrNicknameOnly = multiOnly.bind(null, { table: Main.TUser, where, condition });
		// 检测结果
		const checkResult = await check.with(checkEmail).with(checkNickname).with(emailOrNicknameOnly).end();
		// 没有错误
		if (!checkResult.error) {
			// 创建新账号
			result = await Main.TUser.create(data).then(({ id }) => {
				const status = id? C2_REGISTER_SUCCESS: C5_REGISTER_ERROR;
				return { status };
			}).catch(error => error);
			// 写入session
		}

		return { ...checkResult, ...result };
	},
	async [methods.LOGIN_WITH_EMAIL] (ctx, data: { email: string; password: 'string'; session: any}) {
		
		let { session } = data;
		const result: any  = {};
		const { email, password } = data;
		const check  = new Check ({ email, password, session });

		// 状态
		const { C2_LOGIN_SUCCESS } = types;
		// 用户是否已登录中间件 
		const checkUser = checkUserInfo.bind(null, { table: Main.TUser });
		const checkResult = await check.with(checkHasLogin).with(checkEmail).with(checkPassword).with(checkUser).end();

		// 没有错误
		if ( !checkResult.error ) {
			result.status = C2_LOGIN_SUCCESS;
			ctx.session = {
				id: checkResult.id,
				nickname: checkResult.nickname,
				username: checkResult.username,
			};
		}
		return { ...checkResult, ...result };
	},
};

interface Return {
	error?: boolean;
	status?: string | number;
	data?: any;
}