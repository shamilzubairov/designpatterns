class Logger {
	constructor() {
		this.logs = [];
		this.strategy = Strategy.none;
	}
	log(message) {
		let time = new Date().toISOString();
		this.logs.push({message, time});
		this.strategy(time, message);
	}
	changeStrategy(newstrategy) {
		this.strategy = Strategy[newstrategy];
	}
}

class Strategy {
	static toConsole(time, message) {
		console.log(`${time} - ${message}`);
	}
	static toFile(time, message) {
		console.log('Writing a file message...');
		console.log(`${time} - ${message}`);
		console.log('========');
	}
	static noDate(time, message) {
		console.log(message);
	}
	static none() {

	}
}

let logger = new Logger();