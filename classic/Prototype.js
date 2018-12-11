class SomeClass {
    message() {
        console.log('Hello from prototype');
    }

    clone() {
    	var proto = Object.getPrototypeOf(this);
    	var cloned = Object.create(proto);

    	return cloned;
    }
}

var protoInst = new SomeClass();

var someClass2 = protoInst.clone();
someClass2.message();