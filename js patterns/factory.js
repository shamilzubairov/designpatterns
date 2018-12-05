function TodoModel(){
	if(!(this instanceof TodoModel)) throw new Error;
    var todos = [];
    var lastChange = null;
        
    function addToPrivateList(){ 
        console.log("addToPrivateList"); 
    }
    function add() { console.log("add"); }
    function reload(){}
    
    return Object.freeze({
        add,
        reload
    });
}