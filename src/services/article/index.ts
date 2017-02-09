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
		const { limit } = methods.GET_ALL;
		// 引入及初始化检查插件
		const check = new Check({ ...data, limit});
		let { checkPageId, getArticleList, getAuthorsInfo } = checks;
		// 配置中间件
		getAuthorsInfo = getAuthorsInfo.bind(null, { table: Main.TUser});
		getArticleList = getArticleList.bind(null, { table: Main.TArticle });

		const checkResult = await check.with(checkPageId).with(getArticleList).with(getAuthorsInfo).end();
		// 获取处理结果
		const { status, result } = checkResult;
		return { status: status || 200, data: result? result: null };
	},

	async [ methods.GET_ARTICLE_BY_ID.name ] (data) {
		const { id } = data;
		const check = new Check(data);
		let { checkId, getAuthorInfo, getArticle } = checks;

		// 配置中间件
		getArticle = getArticle.bind(null, { table: Main.TArticle });
		getAuthorInfo = getAuthorInfo.bind(null, { table: Main.TUser});

		const checkResult = await check.with(checkId).with(getArticle).with(getAuthorInfo).end();
		// 获取处理结果
		const { status, result } = checkResult;
		return { status: status || 200, data: result? result: null };

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
