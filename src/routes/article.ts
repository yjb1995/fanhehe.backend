const router = require('koa-router')();
import resConfig from '../utils/resConfig';

import Article from '../services/article/';
import { article } from '../common/constants/request';

router.get(article.GET_ALL.path, async (ctx, next) => {
	let { limit, offset, } = ctx.query;
	// 初始化
	limit = limit && limit < 40? limit : 20;
	offset = offset && offset > -1? offset : 0;
	// 处理请求
	const { status, data } = await Article [ article.GET_ALL.name ] ({ limit, offset });
	return ctx.body = resConfig(status, data);
});

router.get(article.GET_ALL_BY_TYPE.path, async (ctx, next) => {
	let { limit, offset, type } = ctx.query;

	limit = limit && limit < 40? +limit : 20;
	offset = offset && offset > -1? +offset : 0;

	const { status, data } = await Article [ article.GET_ALL_BY_TYPE.name ] ({ limit, offset, type });
	return ctx.body = resConfig(status, data);
});

router.get(article.GET_ARTICLE_BY_ID.path, async (ctx, next) => {
	let { id } = ctx.query;
	// 初始化
	id = id && id > 0? +id: 0;

	const { status, data } = await Article[ article.GET_ARTICLE_BY_ID.name ] ({ id });

	return ctx.body = resConfig(status, data);
});

export default router;