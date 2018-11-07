class Employee {
	constructor(builder) {
		this.name = builder.name;
		this.age = builder.age;
		this.status = builder.status;
	}
}

class Builder {
	constructor(name) {
		this.name = name;
	}
	getAge(age) {
		this.age = age;
		return this;
	}
	getStatus(status) {
		this.status = status;
		return this;
	}
	build() {
		return new Employee(this);
	}
}

var stan = new Builder('Stan').getAge(48).build();