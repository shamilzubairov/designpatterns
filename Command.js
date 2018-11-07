class Conductor {
	static run(command) {
		return command.exec();
	}
}

class Storno {
	constructor(balance) {
		this.balance = balance;
	}
	exec() {
		return (-(this.balance));
	}
}

class Debit {
	constructor(balance, incr) {
		this.balance = balance;	
		this.incr = incr;
	}
	exec() {
		return this.balance + this.incr;
	}
}

function command(cmd, balance, incr=0) {
	if(cmd == 'storno') return Conductor.run(new Storno(balance));
	else if(cmd == 'debit') return Conductor.run(new Debit(balance, incr));
	else return 'command not found';
}