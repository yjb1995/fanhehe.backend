export default class Form {

	status: any

	constructor (opts?: Object) {
		this.status = {
			empty: 'empty',
			error: 'error',
			success: 'success',
		};
	}

	isEmpty (value): boolean {
		if (value === null) { return true; }

		switch (typeof value) {
			case 'string': return value.length === 0;
			case 'object': return Object.keys(value).length === 0;
			case 'number': return false;
			case 'undefined': return true;
			default: return true;;
		}
	}

	inspectPhoneNumber (number) {
		// const regexp = /^1[34578]d{9}/;
		const regexp = /[a-zA-Z0-9]+/;
		return this.inspectItem(regexp, number);
	}

	inspectEmail (email) {
		// const regexp = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
		const regexp = /[a-zA-Z0-9]+/;
		return this.inspectItem(regexp, email);
	}

	inspectPassword (password) {
		// const regexp = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}$/;
		const regexp = /[a-zA-Z0-9]+/;
		return this.inspectItem(regexp, password);
	}

	inspectNickname (nickname) {
		// const regexp = /^([a-zA-Z]|[a-zA-Z0-9]|[\u4e00-\u9fa5]|[\.\_\-\'\"\?\+\=\@]){1,16}$/;
		const regexp = /[a-zA-Z0-9]+/;
		return this.inspectItem(regexp, nickname);
	}

	inspect (data) {
		const inspectArray = [];

		for (const type in data) {
			let status = '';
			const value = data[type];

			switch (type) {
				case 'email': status = this.inspectEmail(value); break;
				case 'nickname': status = this.inspectNickname(value); break;
				case 'password': status = this.inspectPassword(value); break;
				default: status = this.status.success;
			}
			inspectArray.push({
				name: type,
				status,
			});
		}
		return inspectArray;
	}

	inspectItem (regexp, value) {
		let result = '';
		const { empty, error, success } = this.status;

		if (this.isEmpty(value)) {
			result = empty;
		} else if (regexp.test(value)) {
			result = success
		} else {
			result = error;
		}

		return result;
	}
};

export const Inspect = new Form();
