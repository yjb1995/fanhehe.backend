// 遵守 RFC 2616 状态码 本地扩充

// 1
export const C1_CONTINUE = 'C1_CONTINUE';
// 2
export const C2_OK = 'C2_OK';
export const C2_LOGIN_SUCCESS = 'C2_LOGIN_SUCCESS'; // 用户登陆成功
export const C2_LOGOUT_SUCCESS= 'C2_LOGOUT_SUCCESS';// 用户注销成功
export const C2_REGISTER_SUCCESS = 'C2_REGISTER_SUCCESS'; //注册成功
// 3
export const C3_NOT_MODIFED = 'C3_NOT_MODIFED';
// 4
export const C4_NOT_FOUND = 'C4_NOT_FOUND';  // 404 资源未找到
export const C4_BAD_REQUEST = 'C4_BAD_REQUEST'; // bad request
// 4. email 错误
export const C4_EMAIL_FORMAT = 'C4_EMAIL_FORMAT'; // 邮箱格式错误
export const C4_EMAIL_DUPLICATE = 'C4_EMAIL_DUPLICATE'; // 该邮箱已被注册

export const C4_NICKNAME_FORMAT = 'C4_NICKNAME_FORMAT'; // 昵称格式错误
export const C4_NICKNAME_DUPLICATE = 'C4_NICKNAME_DUPLICATE'; // 存在相同的昵称

export const C4_PASSWORD_FORMAT = 'C4_PASSWORD_FORMAT'; // 密码格式错误
export const C4_USER_SHOULD_LOGIN = 'C4_USER_SHOULD_LOGIN'; //用户应该登陆
export const C4_USER_SHOULD_NOT_LOGIN = 'C4_USER_SHOULD_NOT_LOGIN'; // 用户不应该登陆

export const C4_ACCOUNT_NOT_EXIST = 'C4_ACCOUNT_NOT_EXIST'; // 账号不存在
export const C4_PASSWORD_ERROR = 'C4_PASSWORD_ERROR'; // 密码错误
// 5
export const C5_BAD_GATEWAY = 'C5_BAD_GATEWAY';
export const C5_SERVER_ERROR = 'C5_SERVER_ERROR';
export const C5_REGISTER_ERROR = 'C5_REGISTER_ERROR';