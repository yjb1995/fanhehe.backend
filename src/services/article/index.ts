import { article as methods } from '../../common/constants/request';

export default {
	[ methods.GET_ALL.name ] ({ offset, limit }) {
		return { status:'C2_Ok', data: {s:1} };
	},
};
