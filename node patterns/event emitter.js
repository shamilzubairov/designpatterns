const EE = require('events').EventEmitter;

// Стандартный шаблон - пользовательский класс наследует EventEmitter 
// и создает свои события
class Counter extends EE {
	constructor() {
		super();
		this.i = 0;
		this.j = 10;
	}
	start() {
		let i = this.i;
		let j = this.j;

		while(i <= 10) {
			setTimeout(() => {
				j *= 2;
				if(!(j % 640)) this.emit('alert', j);
			}, 10);
			i++;
		}
	}
	emit(...args) { // модификация метода emit
		super.emit(...args);
		console.log(args);
	}
}

// const counter = new Counter(() => console.log('ddd'));
// counter.on('alert', j => { console.log('top set ' + j); })
// counter.start();

// Эквивалентные ф-ции: ф-ция обратного вызова и вызов через событие
function helloEE() {
	const ee = new EventEmitter();
	setTimeout(() => ee.emit('hello', 'hello EE'), 10);
	return ee;
}
function helloCB(callback) {
	setTimeout(() => callback('hello CB'), 10);
}

// Комбинирование EE и обратных вызовов
class Gl extends EE {
	constructor(callback) {
		super();
		this.callback = callback;

		// системное событие, вызывается при регистрации нового обработчика
		this.on('newListener', (ev, lst) => console.log(ev, lst.toString()))

		// для вызова синхронной операции,
		// необходимо заранее определить обработчик
		// this.on('init', msg => console.log(msg));
		
		return this;
	}
	run() {
		this.callback();
		
		// асинхронный вызов
		setTimeout(() => this.emit('init', 'Initial some event'), 1000);
		
		// важно! В синхронных операциях emit никогда не вызовется, 
		// так как его регистрация происходит после вызова:
		//this.emit('init', 'Initial some event');

		return this;
	}
	emit(...args) {
		super.emit(...args);
		// console.log(args[0]);
	}
}

const gl = new Gl(() => console.log('init callback'))
	.run()
	// .on('newListener', (ev, msg) => console.log(ev))
	.on('init', msg => console.log(msg))
	// желательно всегда устанавливать обработчик error
	.on('error', err => console.log(err))
	// .listeners
	// .setMaxListeners