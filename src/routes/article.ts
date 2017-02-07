const router = require('koa-router')();
import resConfig from '../utils/resConfig';

import Article from '../services/article/';
import { article } from '../common/constants/request';

router.get(article.GET_ALL.path, async (ctx, next) => {
	let { pageId } = ctx.query;
	const { status, data } = await Article [ article.GET_ALL.name ] ({ pageId });
	return ctx.body = resConfig(status, data);
});

router.get(article.GET_ALL_BY_TYPE.path, async (ctx, next) => {
	let { pageId, type } = ctx.query;
	const { status, data } = await Article [ article.GET_ALL_BY_TYPE.name ] ({ type, pageId });
	return ctx.body = resConfig(status, data);
});

router.get(article.GET_ARTICLE_BY_ID.path, async (ctx, next) => {
	let { id } = ctx.query;
	// 初始化
	const { status, data } = await Article[ article.GET_ARTICLE_BY_ID.name ] ({ id });
	return ctx.body = resConfig(status, data);
});

export default router;