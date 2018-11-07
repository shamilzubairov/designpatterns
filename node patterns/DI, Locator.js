// Жесткие зависимости
/*
AuthController -> AuthServ -> DB
*/
// file - db.js
const db = require('db');
module.exports = db('name-db');
//-----------------------------------------------------------//
// file - authServ.js
const db = require('./db');
const users = db.createDatabase('users');

exports.login = (username, password, callback) => {
	users.get(username, function(err, user) {
		// ...
	});
};
exports.checkToken = (token, callback) => {
	// ...
	users.get(token, function(err, user) {
		// ...
	});
};
//-----------------------------------------------------------//
// file - authController.js
const authService = require('./authServ');
exports.login = (req, res, next) => {
	authService.login(req.body.username, req.body.password, (err, result) => {
		// ...
	});
};
exports.checkToken = (req, res, next) => {
	authService.checkToken(req.query.token, (err, result) => {
		// ...
	});
}
//-----------------------------------------------------------//
// file - app.js
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const http = require('http');

const authController = require('./authController');

const app = express();

app.use(bodyParser.json());
app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);
app.use(errorHandler());

http.createServer(app).listen(3000, () => {
	console.log('Express server started');
});

// Шаблон «Внедрение зависимостей» (Dependency Injection , DI)
/*
DB:function -> app
AuthServ:function(params:db) -> app
AuthController:function(params:AuthServ) -> app
*/
// file - db.js
const db = require('db');
module.exports = name_db => db(name_db);
//-----------------------------------------------------------//
// file - authServ.js
module.exports = (db, secret) => {
	const users = db.createDatabase('users');
	const authServ = {};
	authServ.login = (username, password, callback) => {
		// ...
	};
	authServ.checkToken = (token, callback) => {
		// ...
	};
	return authServ;
};
//-----------------------------------------------------------//
// file - authController.js
module.exports = (authServ) => {
	const authController = {};
	authController.login = (req, res, next) => {
		// ...
	});
	authController.checkToken = (req, res, next) => {
		// ...
	});
	return authController;
};
//-----------------------------------------------------------//
// file - app.js
const dbFactory = require('./db');
const authServiceFactory = require('./authServ');
const authControllerFactory = require('./authController');

const db = dbFactory('name-db');
const authService = authServiceFactory(db, 'SHHH!');
const authController = authControllerFactory(authService);

app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);

//...
/* 
-> Внедрение через параметры конструктора 
const service = new Service(dependencyA, dependencyB);
-> Внедрение через свойства  
const service = new Service(); //работает как фабрика
service.dependencyA = anInstanceOfDependencyA;
*/

// Шаблон «Локатор служб»
/*
Locator:object
methods:
get,
registry,
factories
	
DB(params:Locator) -> Locator
AuthServ(params:Locator) -> Locator
AuthController(params:Locator) -> Locator
---
Locator -> app
*/
/* Простой шаблон, схожий с шаблоном «Локатор служб»
const dependencies = {};

const db = require('./lib/db');
const authService = require('./lib/authService');

dependencies.db = db();
dependencies.authService = authService(dependencies);
*/
// file - locator.js
module.exports = function() {
	const dependencies = {};
	const factories = {};
	const serviceLocator = {};
	
	serviceLocator.factory = (name, factory) => { //[1]
		factories[name] = factory;
	};
	
	serviceLocator.register = (name, instance) => { //[2]
		dependencies[name] = instance;
	};
	
	serviceLocator.get = (name) => { //[3]
		if(!dependencies[name]) {
			const factory = factories[name];
			dependencies[name] = factory && factory(serviceLocator);
			if(!dependencies[name]) {
				throw new Error('Cannot find module: ' + name);
			}
		}
		return dependencies[name];
	};
	return serviceLocator;
};
// file - db.js
const db = require('db');
module.exports = (locator) => {
	const name_db = locator.get('name_db');
	return db(name_db);
}
//-----------------------------------------------------------//
// file - authServ.js
module.exports = (serviceLocator) => {
	const db = serviceLocator.get('db');
	const tokenSecret = serviceLocator.get('tokenSecret');
	const users = db.sublevel('users');
	
	const authService = {};
	
	authService.login = (username, password, callback) => {
		//...то же, что в предыдущей версии
	}
	
	authService.checkToken = (token, callback) => {
		//...то же, что в предыдущей версии
	}
	return authService;
};
// file - app.js
const svcLoc = require('./serviceLocator')(); //[1]
svcLoc.register('dbName', 'name-db'); //[2]
svcLoc.register('tokenSecret', 'SHHH!');
svcLoc.factory('db', require('./db'));
svcLoc.factory('authService', require('./authService'));
svcLoc.factory('authController', require('./authController'));
const authController = svcLoc.get('authController');
