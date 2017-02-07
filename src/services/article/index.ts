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
		const check = new Check(data);

		const { checkPageId } = checks;
		const checkResult = await check.with(checkPageId).end();
		const { pageId } = checkResult;

		const { limit }= methods.GET_ALL;
		const offset = (pageId - 1) * limit;
		
		const result = await Main.TArticle.findAndCount({
			limit,
			offset,
			where: { status: 1 },
		}).then( data => {
			if (data) data.pageCount = Math.ceil(data.count / limit);
			return data;
		}).catch ( error => { console.log(error); return null; });

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
		const { type } = data;
		const result = await Main.TArticle.findAll({ where: { type } }).then( data => data);

		return { status, data: result? result: null };
	},
};
