import { article as methods } from '../../constants/service';

export default {
	[methods.GET_ALL] ({ offset, limit }) {
		return {status:1, data: {}};
	},
};
