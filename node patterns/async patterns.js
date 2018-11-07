// Пример асинхронной функции
function asyncFunc(callback) {
	setTimeout(() => {
		console.log('an asyncronous task ' + new Date().toISOString());
		callback();
	}, 1000);
}
const tasks = [asyncFunc, asyncFunc, asyncFunc, asyncFunc, asyncFunc]; // коллекция заданий

// Конец всех заданий
function done() {
	console.log('all done');
}

////
////
////
// Последовательное выполнение известного набора заданий
function task1(callback) {
	asyncFunc(() => {
		// console.log('task1');
		task2(callback);
	});
}
function task2(callback) {
	asyncFunc(() => {
		// console.log('task2');
		task3(callback);
	});
}
function task3(callback) {
	asyncFunc(() => {
		// console.log('task3');
		callback(); // завершающее задание
	});
}
// запуск
/*task1(() => {
	console.log('callback executed');
})*/

////
// Шаблон - Последовательный итератор
// Последовательное выполнение набора заданий в коллекции - основан на рекурсии
function iter(ind) {
	if(ind == tasks.length) return done();
	
	let task = tasks[ind];
	task(function() {
		iter(ind + 1);
	})
}
// запуск
// iter(0);

////
// Шаблон - Параллельное выполнение
let j = 0;
tasks.forEach(task => {
	task(() => {
		if(++j == tasks.length) done();
	});
});

////
// Шаблон - Ограниченное параллельное
// Имеет смысл при большом кол-ве параллельных запросов
let concur = 2, running = 0, queue = [...tasks];
function next() {
	while(running < concur && queue.length) {
		let task = queue.shift();
		task(() => {
			running--;
			next();
		});
		running++;
	}
}
// запуск
// next();