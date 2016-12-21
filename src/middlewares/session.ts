import redis = require('ioredis');
import session, { Store } from 'koa-session2';

const config = require('../../config');

class RedisStore extends Store{

    redis: any;

    constructor (options) {
        super();
        const { port, host } = options;
        this.redis = new redis(port, host);
    }

    async get (sid) {
        return await this.redis.get(`SESSION:${sid}`);
    }

    async set (session, opts: { sid?: string | number }) {
        let { sid } = opts;
        if(!sid) sid = super.getID(24);
        await this.redis.set(`SESSION:${sid}`, session);
        return opts.sid;
    }

    async destory (sid) {
        return await this.redis.del(`SESSION:${sid}`);
    }
};

export default function () {
    const key = 'i am fan hehe';
    const options = config.storage.session;

    const store = new RedisStore(options);

    return new session({
        key,
        store,
    });
};
