function sum(a) {
	function innerFunc(b) {
		a += b;
		return innerFunc;
	}
	innerFunc[Symbol.toPrimitive] = () => {
		return a;
	}

	return innerFunc;
}

sum(0)(1)(2)(3)(4)(5) // 15