function doStuff(a, b, c){
	//console.log(arguments.join(" "));
	console.log(Array.prototype.join.apply(arguments, [" "]));
}


doStuff("hello", "how are", "you");