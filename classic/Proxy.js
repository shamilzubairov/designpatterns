function func() {
	return {
		collect(title, text) {
			console.log(title, text);
		}
	}
}

class ProxyClass {
	constructor(subject) {
		this.subject = subject;
	}
	collect(title, text) {
		if(title != 'Title') throw new Error('The head title is not equal to \'Title\'!');
		this.subject().collect(title, text);
	}
}

let funcProxy = new ProxyClass(func);

