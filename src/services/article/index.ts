import Check from '../check/';
import * as checks from '../check/article';

import { Main } from '../../db/mysql';
import { article as methods } from '../../common/constants/request';

export default {
	/**
	 * [offset description]
	 * @type {[type]}
	 * @param {}
	 * @returns {}
	 */
	async [ methods.GET_ALL.name ] (data) {
		const maxLimit = methods.GET_ALL.limit;
		const check = new Check({ ...data, maxLimit });
		const { checkLimitAndOffset } = checks;
		const checkResult = await check.with(checkLimitAndOffset).end();
		const { limit, offset } = checkResult;

		const result = await Main.TArticle.findAll({
			limit,
			offset,
			where: { status: 1 },
		}).then( data => {
			return data;
		} );

		return { status: 1, data: result? result : null };
	},
	async [ methods.GET_ARTICLE_BY_ID.name ] (data) {
		const status = 200;
		const { id } = data;
		const result = await Main.TArticle.findById(id, {}).then( data => data );
		return { status: 'default', data: result? result: null };
	},
	/**
	 * [type description]
	 * @type {[type]}
	 */
	async [ methods.GET_ALL_BY_TYPE.name] (data) {
		const status = 200;
		const { type, limit, offset } = data;
		const result = await Main.TArticle.findAll({ where: { type } }).then( data => data);

		return { status, data: result? result: null };
	},
};
