
var Utils = Utils || {};
Utils.namespace = function(obj, name) {
	if(Utils.namespace){
		return Utils.namespace;
	}

	if(typeof obj == 'string' && name === undefined){
		name = obj;
		obj = {};
	}
	var parts = name.split('.');
	var current = obj;
	for (var i in parts) {
		if (!current[parts[i]]) {
			current[parts[i]] = {};
		}
		current = current[parts[i]];
	}
	return obj;
}


// // test
// var myApp = Utils.namespace('dom.style.color.size');
// console.log(myApp);

// var myApp2 = Utils.namespace({},'dom.style.color.size');
// console.log(myApp2);

// var app3 = {name:'app3'};
// var myApp3 = Utils.namespace(app3,'dom.style.color.size');
// console.log(myApp3);
// console.log(myApp3  === app3);

