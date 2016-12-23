var MinHeap = require("../priorityQueue/minHeapWithConvert.js");

var graph = [
[1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 1, 1],
[1, 1, 1, 0, 1, 1],
[1, 1, 1, 0, 0, 1],
[1, 1, 1, 1, 1, 1],
];

function getNeighbors(pnt){
	var arr = [],
		xDiff = -1;

	while (xDiff <= 1){
		var yDiff = -1;
		while(yDiff <= 1){
			
			if(xDiff === 0 && yDiff === 0){
				++yDiff;
				continue;
			}
			
			var x = pnt[0] + xDiff,
				y = pnt[1] + yDiff;

			if(graph[x] !== undefined && graph[x][y] === 1){
				arr.push([x,y]);
			}

			++yDiff;
		}
		++xDiff;
	}
	return arr;
}

function p(x,y){
	//translating.
	//1,1 is (4,1)
	return [graph.length - y -1, x];
}

function serialize(p){
	return p[0] + "," + p[1];
}

function getHScore(p1, p2){
	return Math.sqrt(
		Math.pow(
			Math.abs(p2[0] - p1[0]), 
		2) +
		Math.pow(
			Math.abs(p2[1] - p1[1]), 
		2)
	);
}

function getGScore(start, p){
	var serialized = serialize(p);
	if(!gScore[serialized]){
		var value;
		if(p[0] === start[0]){
			value = Math.abs(p[1] - start[1]);
		}
		else if(p[1] === start[1]){
			value = Math.abs(p[0] - start[0]);
		}
		else{
			var xDiff = Math.abs(p[0] - start[0]),
				yDiff = Math.abs(p[1] - start[1]);

			if(xDiff <= yDiff){
				value = (1.5 * xDiff) + (yDiff -1);
			}
			else{
				value = (1.5 * yDiff) + (xDiff-1);
			}
		}
		//console.log("value", value);
		gScore[serialized] = value;
	}
	return gScore[serialized];
}

function getFScore(p1, p2){
	return getGScore(p1, p2) + getHScore(p1, p2);
}

function pEquals(x,y){
	//console.log(x[0], y[0], x[1], y[1])
	return x[0] === y[0] && x[1] === y[1];
}

function removePointFromArray(p, arr){
	for(var i=0; i<arr.length; ++i){
		if(pEquals(arr[i], p)){
			//console.log("equals");
			arr.splice(i, 1);
			return;
		}
	}
}

var start = p(1,1),
	goal = p(4,4),
	closed = {},
	open = {},
	cameFrom = {},
	fScore = {}, //distance from start
	gScore = {},
	openSetHeap = new MinHeap(function(val){
		return getFScore(start, val);
	});

open[serialize(start)] = true;
openSetHeap.insert(start);

gScore[serialize(start)] = 0;

function aStar(){
	while(Object.keys(open).length){
		
		var current = openSetHeap.pop(),
			currentSerial = serialize(current);

		console.log("current", current);

		if(pEquals(current, goal)){
			return reconstructPath(cameFrom, current);
		}

		delete open[currentSerial];

		closed[serialize(current)] = true;

		for(var n of getNeighbors(current)){
			var nSerial = serialize(n);
			if(closed[nSerial]){
				continue;
			}

			
			var tentativeGScore = gScore[currentSerial] + getGScore(current, n);
			//console.log("tentative", tentativeGScore);



			if(!open[nSerial]){

				var hScore = getHScore(n, goal);
				fScore[nSerial] = tentativeGScore + hScore;


				open[nSerial] = true;
				openSetHeap.insert(n);

			}
			else if (tentativeGScore >= gScore[nSerial] ){
				continue;
			}
			

			cameFrom[nSerial] = current;
			gScore[nSerial] = tentativeGScore;

				
			console.log("-", nSerial, tentativeGScore, "+", hScore, "=", fScore[nSerial]);



		}
		console.log(" ");
		console.log("peek", openSetHeap.peek());
	}

	console.log("Fail");

}

function reconstructPath(start, finish){
	var path = [],
		prev = finish;

	while(prev){
		path.unshift(prev);
		prev = cameFrom[serialize(prev)];
	}
	
	return path;

}

console.log("start", start);
console.log("goal", goal);
console.log("path: ", aStar());

//console.log("g score 2,2", getGScore(start, p(2,2)))


