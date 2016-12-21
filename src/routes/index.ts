import user from './user';
import blog from './blog';

const router = require('koa-router')();

router.prefix('/api');
router.use('/user', user.routes(), user.allowedMethods());
router.use('/blog', blog.routes(), blog.allowedMethods());

export default router;