class Catalog {
	constructor(name, price) {
		this.name = name;
		this.price = price;
	}
	get total() {
		return this.price;
	}
	print() {
		console.log(`${this.name} $${this.price}`);
	}
}

class CatalogGroup {
	constructor(name, composites=[]) {
		this.name = name;
		this.composites = composites;
	}
	get total() {
		return this.composites.reduce((total, nextItem) => total + nextItem.total, 0);
	}
	print() {
		console.log(`${this.name}`);
		this.composites.forEach(item => item.print());
	}
}

let boots = new Catalog('Leather Boots', 79.99);
let sneakers = new Catalog('Kicks', 39.99);

let groupShoes = new CatalogGroup('Shoes', [boots, sneakers]);

boots.print();
sneakers.print();

groupShoes.print();