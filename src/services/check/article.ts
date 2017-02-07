/**
 * check 中间件函数文件， 涉及所有关于artcile表和article_comments表的检测方法，均为纯函数。
 * 一般规定最后一个参数为待测数据，而之前的参数为附加配置的参数。
 * 禁止从外部获取数据。
 */
import * as types from '../../utils/resConfig';

export function checkLimitAndOffset (data) {
	const minOffset = 0;
	let { offset, limit, maxLimit } = data;

	limit = limit && limit <= maxLimit? +limit : maxLimit;
	offset = offset && offset >= minOffset? +offset : minOffset;

	return { ...data, limit, offset };
};

export function checkId (data) {
	let { id } = data;
	id = id && id > 0? +id: null;

	if (typeof id !== 'number' || isNaN(id)) throw { status: types.C4_ID_TYPE_ERROR };

	return { ...data, id };
}
