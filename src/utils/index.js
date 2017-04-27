export const location = {
	getParams() {
		return window.location.search.slice(1).split('&').map(item => {
			const str = item.split('=');
			return {
				key: str[0],
				value: str[1]
			}
		});
	},
	getParam(key) {
		const objs = this.getParams();

		for (let i = 0; i < objs.length; i++) {
			const obj = objs[i];
			if (obj.key === key) {
				return obj;
			}
		}
		return 'cant find';
	}
};

export const formatParams = (params) => {
	const temp = [];
	for(name in params) {
		const value = params[name];
		temp.push(`${name}=${value}`);
	}
	return temp.join('&');
}