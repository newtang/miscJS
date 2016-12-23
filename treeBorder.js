function treeBorder(node){
	var values = leftTree(node);
	values.push.apply(values, bottomTree(node).slice(1, -1));
	values.push.apply(values, rightTree(node.right));
	return values;
}

function bottomTree(node){
	var values = [];

	if(!node.left && !node.right){
		values.push(node.v);
	}

	if(node.left){
		values.push.apply(values, bottomTree(node.left));
	}
	if(node.right){
		values.push.apply(values, bottomTree(node.right));
	}
	return values;
}

function leftTree(node){
	var values = [node.v];
	if(node.left){
		var leftV = leftTree(node.left);
		values.push.apply(values, leftV);
	}

	return values;
}



function rightTree(node){
	var values = [];
	if(node.right){
		values.push.apply(values, rightTree(node.right));
	}
	values.push(node.v);
	return values;
}

function Node(value){
	this.v = value;
}

var nodeValues = [10, 7, 5, 4, 8, 7.5, 9, 15, 13, 14, 20];
var nodeMap = {}

nodeValues.forEach(function(val){
	var node = new Node(val);
	nodeMap[val] = node;
});

nodeMap[10].left = nodeMap[7];
nodeMap[10].right = nodeMap[15];

nodeMap[7].left = nodeMap[5];
nodeMap[7].right = nodeMap[8];

nodeMap[5].left = nodeMap[4];

nodeMap[8].left = nodeMap[7.5];
nodeMap[8].right = nodeMap[9];

nodeMap[15].left = nodeMap[13];
nodeMap[15].right = nodeMap[20];

nodeMap[13].right = nodeMap[14];

var root = nodeMap[10];
console.log(treeBorder(root));

