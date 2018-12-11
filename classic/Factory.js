class Employee {

}
class Manager {

}

var factory = (className) => {
	if(className == 'Employee') return new Employee();
	else return new Manager();
}

var someClass1 = factory('Employee');
var someClass2 = factory('Manager');