class Inventory {
	constructor(name, price) {
		this.name = name;
		this.price = price;
	}
	print() {
		console.log(`${item.name} const ${item.price}`);
	}
}
class GoldenInventory {
	constructor(baseInventory) {
		this.name = `Golden ${baseInventory.name}`;
		this.price = 1000 + baseInventory.price;
	}
}
class DiamondInventory {
	constructor(baseInventory) {
		this.name = `Diamond ${baseInventory.name}`;
		this.price = 2000 + baseInventory.price;
	}
}

let walkman = new Inventory('walkman', 29);
let neclace = new Inventory('neclace', 29);

let golden_neclace = new GoldenInventory(neclace);
let diamond_golden_neclace = new DiamondInventory(golden_neclace); 