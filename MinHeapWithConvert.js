function MinHeap(calcKey){
	this._arr = [];
	this._calcKey = calcKey;
}

MinHeap.prototype.peek = function(){
	return this._arr[0];
};

//removeMax
MinHeap.prototype.pop = function(){
	var val = this._arr[0],
		lastIndex = this._arr.length - 1;

	//remove the last item, and place it at the top. Then siftDown
	//this._arr[0] = this.arr.pop();
	var removed = this._arr.splice(lastIndex,1)[0];
	if(lastIndex > 0){
		this._arr[0] = removed; 
		this._siftDown(0);
	}
	return val;
};

MinHeap.prototype.insert = function(num){
	//add to the end of the array, then siftUp
	this._arr.push(num);
	this._siftUp(this._arr.length-1);
};

MinHeap.prototype.size = function(num){
	//add to the end of the array, then siftUp
	return this._arr.length;
};

/***************** helpers! *****************/

//siftUp is used after an element is inserted.
MinHeap.prototype._siftUp = function(index){
	var currValue = this._calcKey(this._arr[index]),
		parentIndex = this._getParentIndex(index),
		parentValue = this._calcKey(this._arr[parentIndex]);

	if(currValue < parentValue){
		this._swap(index, parentIndex);
		this._siftUp(parentIndex);
	}
	
};

//siftDown is used when an element is popped.
MinHeap.prototype._siftDown = function(index){
	var currValue = this._calcKey(this._arr[index]),
		leftChildIndex = this._getLeftChildIndex(index),
		rightChildIndex = this._getRightChildIndex(index);

	var leastChildIndex = this._leastChildIndex(leftChildIndex, rightChildIndex);

	if(leastChildIndex !== null){
		var leastChildValue = this._calcKey(this._arr[leastChildIndex]);

		if(leastChildValue < currValue){
			this._swap(index, leastChildIndex);
			this._siftDown(leastChildIndex);
		}	
	}	
};

MinHeap.prototype._leastChildIndex = function(leftChildIndex, rightChildIndex){
	var lastIndex = this._arr.length - 1,
		leftChildValue = null,
		rightChildValue = null;

	if(leftChildIndex <= lastIndex){
		leftChildValue = this._calcKey(this._arr[leftChildIndex]);
	}

	if(rightChildIndex <= lastIndex){
		rightChildValue = this._calcKey(this._arr[rightChildIndex]);
	}

	if(leftChildValue === null && rightChildValue === null){
		//there are no children.
		return null;
	}
	else if(leftChildValue !== null && rightChildValue !== null){
		if(leftChildValue < rightChildValue){
			return leftChildIndex;
		}
		else{
			return rightChildIndex;
		}
	}
	else if(leftChildValue !== null){
		return leftChildIndex;
	}
	else {
		return rightChildIndex;
	}
};

MinHeap.prototype._swap = function(index1, index2){
	var tmp = this._arr[index1];
	this._arr[index1] = this._arr[index2];
	this._arr[index2] = tmp;
};

MinHeap.prototype._getParentIndex = function(index){
	if(index === 0){
		return 0;
	} 
	else{ 
		return Math.floor( (index - 1) / 2);
	}
};

MinHeap.prototype._getLeftChildIndex = function(index){
	return index * 2 + 1;	
};

MinHeap.prototype._getRightChildIndex = function(index){
	return index * 2 + 2;	
};


module.exports = MinHeap;

