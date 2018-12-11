class Storage {
	constructor(name, values=[]) {
		this.name = name;
		this.values = values;
		this.next = null;
	}
	setNext(storage) {
		this.next = storage;
	}
	find(value) {
		if(this.values.includes(value)) {
			return `${value} in the ${this.name}`;
		} else if(this.next) {
			return this.next.find(value);
		} else {
			return 'not found';
		}
	}
}

let warehouse_small = new Storage('small', ['nails', 'tool kit', 'glue']);
let warehouse_medium = new Storage('medium', ['boxes', 'clothes']);
let warehouse_grand = new Storage('grand', ['engines', 'metal']);

warehouse_small.setNext(warehouse_medium);
warehouse_medium.setNext(warehouse_grand);

warehouse_small.find('clothes')