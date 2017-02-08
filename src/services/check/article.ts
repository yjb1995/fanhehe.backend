/**
 * check 中间件函数文件， 涉及所有关于artcile表和article_comments表的检测方法，均为纯函数。
 * 一般规定最后一个参数为待测数据，而之前的参数为附加配置的参数。
 * 禁止从外部获取数据。
 */

import * as types from '../../utils/resConfig';
import { article } from '../../common/constants/request';
/**
 * [checkId description] 检查id, id >= 0 
 * @param {[type]} data [description] 待检查的数据
 */
export function checkId (data) {
	let { id } = data;
	id = id && id > 0? +id: null;

	if (typeof id !== 'number' || isNaN(id)) throw { status: types.C4_ID_TYPE_ERROR };

	return { ...data, id };
}

/**
 * [checkPageId description] 分页组件检查pageId, pageId >= 1
 * @param {[type]} data [description] 待检查的数据
 */
export function checkPageId (data) {
	let { pageId: id } = data;
	id = id && id > 0? +id: 0;

	if (typeof id !== 'number' || isNaN(id) || id <= 0) throw { status: types.C4_ID_TYPE_ERROR };

	return { ...data, pageId: id };
};
/**
 * [getArticleList description] 
 * @param {[Object]} options [description]
 * @param {[Object]} data [description]
 */
export async function getArticleList (options, data) {
	const { table } = options;
	const { pageId, limit } = data;
	const offset = (pageId - 1) * limit;
	
	const where  = { status: 1 };
	const method = 'findAndCount'; // 查询并获取数量 返回 { rows: Object[], count: Number }
	const selectResult = await select({ table, where, method, limit, offset });
	// 分页换算
	selectResult.count = Math.ceil( selectResult.count / limit);
	return { ...data, result: selectResult };
};

/**
 * [getAuthorInfo description] 根据 获取的文章信息获取相关的作者信息
 * @param {[Object]} options [description] 
 * @param {[Object]} data    [description]
 */
export async function getAuthorInfo (options, data) {
	const { result: articles } = data;
	const { table } = options;
	const method = 'findAll';
	const attributes = ['username', 'preview', 'nickname'];
	// 如果文章不存在或者文章非数组 则抛错
	if (!(articles && articles.rows instanceof Array)) throw { status: types.C5_BAD_GATEWAY };
	// 获取所有选出的文章的作者-用户名并去重
	let userList = articles.rows.map(row => row.author);
	userList = Array.from(new Set(userList));

	const where = { username: userList, status: 1}
	const users = await select({table, where, method, attributes});
	// 如果根据文章获取的作者信息非数组则抛错。
	if (!(users instanceof Array)) throw { status: types.C4_USERNAME_FORMAT};
	// 重组信息

	articles.rows = articles.rows.map(row => {
		row.dataValues.up = users.filter((user, index)=> user.username ===  row.author)[0] || {};
		return row;
	});
	return { ...data, result: articles };
};


// 一下为每个check文件都可复用的函数

/**
 * [select description] 从数据库中查询数据
 * @param {string; }} options       [description]
 * @param {[type]}     data [description]
 */
export const select = async (options: { table: any; method: string; where: any; attributes?: any; limit?: number; offset?: number; order?: any[]; }) => {
	const { method } = options;
	const Table = options.table;
	

	// 初始化
	delete options.table;
	delete options.method;
	const condition = options;

	return await Table[method](condition)
		.then(data   => data? data: { error: true })
		.catch(error => { console.log(error); return { error: true } });
};

export function s() {};