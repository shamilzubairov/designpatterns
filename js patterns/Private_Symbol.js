// Symbol эмулирует private свойств
// private_obj[private_foo] вызвать не получится
function Test(arg) {
	const private_foo = Symbol();

	var private_obj = {}
	private_obj[private_foo] = function getSecret() { return 'Secret word'; }

	return {
		public_func: function() { return private_obj[private_foo](); },
		private_obj
	}
}