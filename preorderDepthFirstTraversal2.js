"use strict";

//reconstruct tree from a depth first preorder traversal
// F, B, A, D, C, E, G, I, H
// 10 5  1  7  6  9  15 20 17



function Node(c){
	this.value = c;
	this.left = null;
	this.right = null;
}

//n log n....maybe n?
function constructTree(preorder){
	let nodes = [];
	nodes[0] = new Node(preorder[0]);
	for(let i=1,len = preorder.length; i<len; ++i){
		let newNode = new Node(preorder[i]);
		let node = nodes[0];

		while(true){
			if(newNode.value > node.value){
				if(node.right){
					node = node.right;
				}
				else{
					node.right = newNode;
					break;
				}
			}
			else{
				if(node.left){
					node = node.left;
				}
				else{
					node.left = newNode;
					break;
				}
			}

		}

		nodes.push(newNode);

	}
	return nodes[0];
	
}

var _index = 0;
function constructTreeLinear(nodes, min, max){
	if(_index >= nodes.length) return null;

	let node = null,
		key = nodes[_index];

	if(key > min && key < max){
		node = new Node(key);
		++_index;
		if(_index < nodes.length){
			node.left = constructTreeLinear(nodes, min, key);
			node.right = constructTreeLinear(nodes, key, max);
		}
	}

	return node;
}



let results = constructTree([10, 5, 1, 7, 6, 9, 15, 20, 17]);
let results2 = constructTreeLinear([10, 5, 1, 7, 6, 9, 15, 20, 17], Number.MIN_VALUE, Number.MAX_VALUE);



function check(nodes){
	nodes.forEach(function(node){
		console.log(node.value, node.left && node.left.value, node.right&& node.right.value)
	});
}

function checkRecursively(node){
	if(!node) return;
	console.log(node.value, node.left && node.left.value, node.right&& node.right.value);
	checkRecursively(node.left);
	checkRecursively(node.right);
}

//checkRecursively(results);
//console.log(" ");
//checkRecursively(results2);

/*
invalids:
2, 4, 1
2, 5, 4, 1
40, 30, 35, 20, 80, 100
2, 50, 40,30,20,25

valids:
2, 1, 4
3, 2, 1, 4
2, 3, 4
5, 3, 1
*/


function validatePreorderTree(arr, n){
    // Create an empty stack
    let stack = [];
    let root = Number.MIN_VALUE;

    for(let i=0; i<n; ++i){
    	let num = arr[i];
    	if(arr[i] < root){
    		return false;
    	}

    	while(stack.length != 0 && num > stack[stack.length-1]){
    		root = stack[stack.length-1];
    		stack.pop();
    	}

    	stack.push(num);
    }
    return true;
}


console.log("false", validatePreorderTree([2, 4, 1],3));
console.log("true", validatePreorderTree([2, 5, 4, 6],4));
console.log("false", validatePreorderTree([2, 5, 4, 1],4));
console.log("false", validatePreorderTree([40, 30, 20, 35, 21, 80, 100],7));
console.log("true", validatePreorderTree([2, 1, 4],3));
console.log("true", validatePreorderTree([10, 5, 1, 7, 6, 9, 15, 20, 17],9));
console.log("true", validatePreorderTree([5],1));
console.log("true", validatePreorderTree([2, 50, 40,30,20,25],6));









function validatePreorderTree2(arr, n){
	let min = Number.MIN_VALUE,
		stack = [];

	for(let i = 0; i<arr.length; ++i){
		let node = arr[i];
		if(node < min){
			return false;
		}

		while(stack.length && node > stack[stack.length-1]){
			min = stack.pop();
		}

		stack.push(node);
	}

}

function validatePreorderTreeRecursively(arr, start, end, min){
	if(start === undefined){
		start = 0;
	}
	if(end === undefined){
		end = arr.length-1;
	}
	if(min === undefined){
		min = Number.MIN_VALUE;
	}

	if(start > end){
		return true;
	}

	var root = arr[start];

	if(root < min){
		//console.log("A", root, min)
		return false;
	}

	var valid = true;

	for(var i=start+1; i<=end; ++i){
		if(arr[i]< min){
			//console.log("B")
			return false;
		}

		if(arr[i] > root){
			//console.log("A calling with args as", start+1, i-1, min);
			valid = validatePreorderTreeRecursively(arr, start+1, i-1, min);
			break;
		}
	}

	if(valid){
		//console.log("B calling with args as", i, end, root);
		return validatePreorderTreeRecursively(arr, i, end, root);
	}
	else{
		//console.log("C")
		return false;
	}
}

console.log("    ----- recursively ----- ");
console.log("false", validatePreorderTreeRecursively([2, 4, 1]));
console.log("true", validatePreorderTreeRecursively([2, 5, 4, 6]));

console.log("false", validatePreorderTreeRecursively([2, 5, 4, 1]));
console.log("false", validatePreorderTreeRecursively([40, 30, 20, 35, 21, 80, 100]));
console.log("true", validatePreorderTreeRecursively([2, 1, 4]));
console.log("true", validatePreorderTreeRecursively([10, 5, 1, 7, 6, 9, 15, 20, 17]));
console.log("true", validatePreorderTreeRecursively([5]));
console.log("true", validatePreorderTreeRecursively([2, 50, 40,30,20,25]));





