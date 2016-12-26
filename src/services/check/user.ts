import * as types from '../../constants/response';

// 邮箱格式检查
export function checkEmail (data) {
	
	const { email } = data;
	const regexp    = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;

	if (!regexp.test(email)) throw { error: true, status: types.C4_EMAIL_FORMAT };

	return data;
};
// 昵称格式检查
export function checkNickname (data) {
	const { nickname } = data;
	const regexp       = /^([a-zA-Z]|[a-zA-Z0-9]|[\u4e00-\u9fa5]|[\.\_\-\'\"\?\+\=\@]){1,16}$/;

	if (!regexp.test(nickname)) throw { error: true, status: types.C4_NICKNAME_FORMAT }; 

	return data;
};

// 数据库 属性唯一性检查 
export const only = async (options: { table: any; where: any; error?: string| number;}, data?) => {
	const Table = options.table;
	const { where, error } = options;
	console.log('xxhhuuss',where);
	const isDuplicate = await Table.find({where, attributes: ['id']})
							.then((data) => data? data.dataValues.id: data)
							.catch(error => {console.log(error); return true});

	if (isDuplicate) throw { status: error, error: true };

	return data;
};
