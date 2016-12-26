import Check from '../check';
import { checkEmail, checkNickname, only } from '../check/user';

import { Main } from '../../db/mysql';
import * as types from '../../constants/response';
import { user as methods} from '../../constants/service';


export default {
	/**
	 * @param  {} payload
	 * @returns
	 */
	async [methods.REGISTER_WITH_EMAIL] (data) {
		let result: any = {};
		const check = new Check(data);
		const { email, nickname } = data;

		// 处理状态 
		const { C2_REGISTER_SUCCESS, C5_REGISTER_ERROR,C4_EMAIL_DUPLICATE ,C4_NICKNAME_FORMAT, C4_NICKNAME_DUPLICATE} = types;
		
		// 数据检查中间件
		const emailOnly = only.bind(null, { table: Main.TUser, where: { '$or': [ {email, nickname}] }, error: C4_EMAIL_DUPLICATE });
		// 检测结果
		const checkResult = await check.with(checkEmail).with(checkNickname).with(emailOnly).end();
		
		if (!checkResult.error) { 
			result = await Main.TUser.create(data).then(({ id }) => {
				let status = C2_REGISTER_SUCCESS;
				if (!id) status = C5_REGISTER_ERROR;
				return { status };
			}).catch(error => error);
		}
		return {
			...checkResult,
			...result
		};
	},
	async [methods.REGISTER_WITH_PHONE] (data) {

	},
};

interface Return {
	error?: boolean;
	status?: string | number;
	data?: any;
}