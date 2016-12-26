export default class Check {

	private data: any;
	private middlewares: any[];

	constructor (data?) {
		this.middlewares = [];
		this.data = data || {};
	};

	with (middleware?, end?: boolean) {
		if (typeof middleware === 'function') this.middlewares.push(middleware);
		if (middleware instanceof Array) middleware.forEach(item => this.with[item]);

		// if (end) return this.end();

		return this;
	};

	end () {
		const { catches, data, check } = this;
		let promise = Promise.resolve(data);

		promise = this.middlewares.reduce((promise, item, index, array) => {
			return promise.then(check(item));
		}, promise);

		return promise.catch(catches);
	};

	private catches (error?: any) {
		return {
			error: true,
			...error,
		}
	};

	private check (middleware) {
		return (data) => middleware(data);
	};
}