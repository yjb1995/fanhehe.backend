import Check from '../check';
import * as checks from '../check/user';
// import { checkEmail, checkNickname, singleOnly, multiOnly, checkPassword, shouldLogin, shouldNotLogin, checkUserInfo } from '../check/user';

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
		// 中间件
		const { multiOnly, checkEmail, checkNickname } = checks;
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
	/**
	 * [ctx description]
	 * @type {[type]}
	 */
	async [methods.LOGIN_WITH_EMAIL] (ctx, data: { email: string; password: 'string'; session: any}) {
		
		const result: any  = {};
		const { email, password, session } = data;
		const check  = new Check ({ email, password, session });

		// 状态
		const { C2_LOGIN_SUCCESS } = types;
		// 中间件
		const { checkUserInfo, shouldNotLogin, checkEmail, checkPassword } = checks;
		// 用户是否已登录中间件 
		const checkUser = checkUserInfo.bind(null, { table: Main.TUser });
		const checkResult = await check.with(shouldNotLogin).with(checkEmail).with(checkPassword).with(checkUser).end();

		// 没有错误
		if ( !checkResult.error ) {
			result.status = C2_LOGIN_SUCCESS;
			const { id, username, nickname } = checkResult.data;
			ctx.session = { id, email, nickname, username };
		}

		return { ...checkResult, ...result };
	},
	/**
	 * [ctx description]
	 * @type {[type]}
	 */
	async [methods.LOGOUT] (ctx, data: any) {
		const { session } = ctx;
		const check = new Check({ session });
		// 成功的状态
		const status = types.C2_LOGOUT_SUCCESS;
		// 中间件
		const { shouldLogin } = checks;
		const checkResult = await check.with(shouldLogin).end();
		// 注销
		if (!checkResult.error) ctx.session = null;
		return { status, ...checkResult };
	},
	async [methods.GET_USER_INFO_BY_ID] (ctx, data) {
		const { session, id} = data;
		const check = new Check({ session, id });
	}
};

interface Return {
	error?: boolean;
	status?: string | number;
	data?: any;
}