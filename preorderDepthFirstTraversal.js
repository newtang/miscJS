"use strict";

//reconstruct tree from a depth first preorder traversal
// F, B, A, D, C, E, G, I, H
// 10 5  1  7  6  9  15 20 17

let nodes = [];

function Node(c){
	this.value = c;
	this.left = null;
	this.right = null;
}

function constructTree(preorder){
	let head = new Node(preorder[0]),
		prev = head,
		i = 1,
		len = preorder.length;

	nodes[0] = head;	

	while(i < len){
		while(i < len && preorder[i] < prev.value){
			let cur = new Node(preorder[i]);
			prev.left = cur;
			prev = cur;
			nodes[i] = cur;
			++i;
		}

		if(i>=len){
			return;
		}

		//we have a node that's greater than now.
		let node = new Node(preorder[i]);

		let j = 0;
		let cur = nodes[j];
		while (j<i){
			if(node.value > cur.value){
				if(cur.right){
					cur = cur.right;
				}
				else{
					cur.right = node;
				}
			}
			else{
				if(cur.left){
					cur = cur.left;
				}
				else{
					cur.left = node;
				}
			}

		}

		nodes[i] = node;

		console.log("setting right: " , j );
		nodes[j].right = node;
		prev = node;
		++i;

		while(i < len && preorder[i] > prev.value){
			let cur = new Node(preorder[i]);
			prev.right = cur;
			prev = cur;
			nodes[i] = cur;
			++i;
		}

	}
}

constructTree([10, 5, 1, 7, 6, 9, 15, 20, 17]);


function check(nodes){
	nodes.forEach(function(node){
		console.log(node.value, node.left && node.left.value, node.right&& node.right.value)
	});
}

check(nodes);


