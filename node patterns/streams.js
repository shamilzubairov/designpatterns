const stream = require('stream');

class ReadStream extends stream.Readable {
	constructor(chunk) {
		super({
			encoding: 'utf8', 
			// objectMode: true,
			// highWaterMark: 1,
		});
		this.chunk = chunk;
	}
	_read(size) {
		let  i = 10;
		// console.log(size); 16384
		while(i > 0) {
			this.push(this.chunk);
			i--;
		}
		this.push(null);
	}
}

class WriteStream extends stream.Writable {
	constructor() {
		super({
			objectMode: true,
			// decodeString: false
		})
	}
	_write(chunk, encoding, callback) {
		console.log(chunk);
		callback();
	}
}

let readStream = new ReadStream('Hello readable stream');

// readStream.setEncoding('utf8');

// let writeStream = new WriteStream();
/*
readStream.on('readable', () => {
	let chunk = readStream.read();
})//.pipe(process.stdout);

readStream.on('end', () => {
	console.log('\nall done');
})
*/

let writeStream = new WriteStream();

// writeStream.write({message: 'Hello writable stream'});

// Преобразующий поток
class TransformStream extends stream.Transform {
	constructor() {
		super();
		this.pieces = '';
	}
	_transform(chunk, encoding, callback) {
		this.pieces = chunk;
		this.push(this.pieces + ' - || --');
		callback();
	}
	_flush(callback) {
		this.push(this.pieces + ' - || --');
	}
}

let transformStream = new TransformStream();
transformStream.setEncoding('utf8');

readStream.pipe(transformStream);

transformStream.on('data', chunk => {
	console.log(chunk);
})
transformStream.on('finish', () => {
	console.log('finish')
})
readStream.on('end', () => {
	console.log('\nall done');
})
