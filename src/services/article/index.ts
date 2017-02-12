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
		let { checkPageId, getArticles, getAuthorsInfo } = checks;
		// 配置中间件
		getArticles = getArticles.bind(null, { table: Main.TArticle });
		getAuthorsInfo = getAuthorsInfo.bind(null, { table: Main.TUser});
		

		const checkResult = await check.with(checkPageId).with(getArticles).with(getAuthorsInfo).end();
		// 获取处理结果
		const { status, result } = checkResult;
		return { status: status || 200, data: result? result: null };
	},

	async [ methods.GET_ARTICLE_BY_ID.name ] (data) {
		const { id } = data;
		const check = new Check(data);
		let { checkId, getArticleAuthor, getArticle, getCommentsAuthor, getArticleComments } = checks;

		// 配置中间件
		getArticle = getArticle.bind(null, { table: Main.TArticle });
		getArticleAuthor = getArticleAuthor.bind(null, { table: Main.TUser});
		getCommentsAuthor = getCommentsAuthor.bind(null, { table: Main.TUser });
		getArticleComments = getArticleComments.bind(null, { table: Main.TArticleComments });

		const checkResult = await check.with(checkId)
			.with(getArticle).with(getArticleAuthor)
			.with(getArticleComments).with(getCommentsAuthor).end();
		// 获取处理结果
		const { status, result } = checkResult;
		return { status: status || 200, data: result? result: null };

	},
	/**
	 * [type description]
	 * @type {[type]}
	 */
	async [ methods.GET_ALL_BY_TYPE.name] (data) {
		const { type } = data;
		const result = await Main.TArticle.findAll({ where: { type } }).then( data => data);

		return { status: 200, data: result? result: null };
	},
	async [ methods.CREATE_COMMENT.name ] (data) {
		return { status: 200, data: null };
	},
	async [ methods.DELETE_COMMENT.name ] (data) {
		return { status: 200, data: null };
	},
};
