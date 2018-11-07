const tasks = [getFileName_async, getFileName_async, getFileName_async];

function promisify(callback) {
	return function() {
		//.. вернется при первом вызове
		const args = [].slice.call(arguments); // аргументы getFileName_promise ['name.txt', '/etc/name/']
		return new Promise((resolve, reject) => {
			args.push((err, result) => {
				if(err) return reject(err);
				resolve(result);
			});
			callback.apply(null, args);
		});
		//..
	}
}

 // типовая ф-ция - принимает 3 аргумента: 
 // 1 - ошибка, 2 - массив аргументов, 3 - ф-ция обратного вызова
function getFileName_async(error=null, argu_array=['name', 'path'], callback=f=>f) {
	setTimeout(callback.bind(null, error, argu_array), 1000);
}

let getFileName_promise = promisify(getFileName_async);

/*getFileName_promise(null, ['name.txt', '/etc/name/'])
	.then((res) => {
		console.log(res);
		return getFileName_promise(null, ['name1.txt', '/etc/name1/'])
	})
	.then((res) => console.log(res))
	.catch(err => console.log(err));
*/