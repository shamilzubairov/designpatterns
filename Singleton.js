class SomeClass {
    message() {
        console.log('Hello from singleton');
    }
}

class Singleton {
    constructor() {
        if(!Singleton.instance) Singleton.instance = new SomeClass();
    }

    getInstance() {
        return Singleton.instance;
    }
}

var someClass = new Singleton().getInstance();