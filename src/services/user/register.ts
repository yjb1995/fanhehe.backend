import { Main } from '../../db/mysql';
import { Inspect } from '../../utils/inspect';

import { user as types} from '../../constants/service';

export default {
	/**
	 * @param  {} payload
	 * @returns
	 */
	[types.REGISTER_WITH_EMAIL] (payload) {
		const data = payload;
		let { email, nickname } = data;
		if(!Inspect.inspectEmail(email)) {}
		if(!Inspect.inspectNickname(nickname)) {
			
		}
		return Main.TUser.findOrCreate({
			where: {
				email,
				nickname,
			},
			default: {
				...data,
			},
		}).catch(err => {console.log(err); return {};});
	},
};

