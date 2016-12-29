import * as types from '../constants/response';

export default function response(status: string | number, data = null, options?: Options): ResponseBody {
	options = options || {};

	const body: any = {};
	const lang = options.lang || 'zh_cn';
	const state = resList[status] || resList.default;
	
	if (data) body.data = data;

	body.code = state.code;
	body.message =  state.message[lang];

	return body;
}

const resList = {
	[types.C2_OK]: {
		code: 200,
		message: {
			zh_cn: '成功',
			en_us: 'ok',
		},
	},
	[types.C2_REGISTER_SUCCESS]: {
		code: 2001,
		message: {
			zh_cn: '注册成功',
			en_us: '',
		}
	},
	[types.C2_LOGIN_SUCCESS]: {
		code: 2002,
		message: {
			zh_cn: '登陆成功',
			en_us: '',
		},
	},
	[types.C4_NOT_FOUND]: {
		code: 404,
		message: {
			zh_cn: '您访问的资源不存在',
			en_us: ''
		},
	},
	[types.C4_USER_HAS_LOGIN]: {
		code: 4000,
		message: {
			zh_cn: '用户已登录',
			en_us: '',
		}
	},
	[types.C4_EMAIL_FORMAT]: {
		code: 4001,
		message: {
			zh_cn: '邮箱格式错误',
			en_us: ''
		},
	},
	[types.C4_EMAIL_DUPLICATE]: {
		code: 4002,
		message: {
			zh_cn: '此邮箱已被使用',
			en_us: ''
		},
	},
	[types.C4_NICKNAME_FORMAT]: {
		code: 4003,
		message: {
			zh_cn: '不能使用非法字符',
			en_us: ''
		},
	},
	[types.C4_NICKNAME_DUPLICATE]: {
		code: 4004,
		message: {
			zh_cn: '此昵称已被使用',
			en_us: ''
		},
	},
	[types.C4_PASSWORD_FORMAT]: {
		code: 4005,
		message: {
			zh_cn: '密码格式错误',
			en_us: ''
		},
	},
	[types.C4_ACCOUNT_NOT_EXIST]: {
		code: 4006,
		message: {
			zh_cn: '账号不存在',
			en_us: '',
		},
	},
	[types.C4_PASSWORD_ERROR]: {
		code: 4007,
		message: {
			zh_cn: '密码输入错误',
			en_us: '',
		},
	},
	[types.C5_SERVER_ERROR]: {
		code: 500,
		message: {
			zh_cn: '网络繁忙,请稍后再试',
			en_us: '',
		},
	},
	[types.C5_REGISTER_ERROR]: {
		code: 5001,
		message: {
			zh_cn: '注册失败',
			en_us:'',
		}
	},
	default: {
		code: 404,
		message: {
			zh_cn: '您访问的资源不存在',
			en_us: ''
		},
	},
}
interface ResponseBody {
	message?: string; // 信息
	code?: string | number; // 状态码
	data?: Object; // payload数据
	status?: string | number; //状态
};

interface Options {
	lang?: 'string'; // 语言类型
};