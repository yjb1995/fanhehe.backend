import Check from '../check/';

import { Main } from '../../db/mysql';
import { article as methods } from '../../common/constants/request';

export default {
	async [ methods.GET_ALL.name ] ({ offset, limit }) {
		const status = 200;
		const data = await Main.TArticle.findAll({
			limit,
			offset,
		}).then((data) => data? data: null );
		return { status, data };
	},
};
