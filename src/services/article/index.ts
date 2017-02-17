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
	/**
	 * 根据文章ID 获取文章内容及作者信息
	 */
	async [ methods.GET_ARTICLE_BY_ID.name ] (data) {
		const { id } = data;
		const check = new Check(data);
		let { checkId, getArticle, getArticleAuthor } = checks;

		// 配置中间件
		getArticle = getArticle.bind(null, { table: Main.TArticle });
		getArticleAuthor = getArticleAuthor.bind(null, { table: Main.TUser});
		// main处理
		const checkResult = await check.with(checkId).with(getArticle).with(getArticleAuthor).end();
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
		const check = new Check(data);
		
		return { status: 200, data: null };
	},
	async [ methods.DELETE_COMMENT.name ] (data) {
		return { status: 200, data: null };
	},
	async [ methods.GET_COMMENTS.name ] (data) {
		const { id } = data;
		const check = new Check(data);
		let { checkId, checkPageId, getComments, getChildComments } = checks;
		// 配置中间件
		getComments = getComments.bind(null, { table: Main.TArticleComments });
		getChildComments = getChildComments.bind(null, { table: Main.TArticleComments });
		// main处理
		const checkResult = await check.with(checkId).with(checkPageId).with(getComments).with(getChildComments).end();
		// 获取处理结果
		const { status, result } = checkResult;
		return { status: status || 200, data: result? result: null };
	},
};
