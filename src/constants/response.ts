// 遵守 RFC 2616 状态码 本地扩充

// 1
export const C1_CONTINUE = 'C1_CONTINUE';
// 2
export const C2_OK = 'C2_OK';
export const C2_REGISTER_SUCCESS = 'C2_REGISTER_SUCCESS';
// 3
export const C3_NOT_MODIFED = 'C3_NOT_MODIFED';
// 4
export const C4_NOT_FOUND = 'C4_NOT_FOUND';
export const C4_BAD_REQUEST = 'C4_BAD_REQUEST';
// 4. email 错误
export const C4_EMAIL_FORMAT = 'C4_EMAIL_FORMAT';
export const C4_EMAIL_DUPLICATE = 'C4_EMAIL_DUPLICATE';

export const C4_NICKNAME_FORMAT = 'C4_NICKNAME_FORMAT';
export const C4_NICKNAME_DUPLICATE = 'C4_NICKNAME_DUPLICATE';

export const C4_PASSWORD_FORMAT = 'C4_PASSWORD_FORMAT'; 
export const C4_USER_HAS_LOGIN = 'C4_USER_HAS_LOGIN';

// 5
export const C5_BAD_GATEWAY = 'C5_BAD_GATEWAY';
export const C5_SERVER_ERROR = 'C5_SERVER_ERROR';
export const C5_REGISTER_ERROR = 'C5_REGISTER_ERROR';