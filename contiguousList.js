var hash = {};

function longestNonDecreasingSequence(arr, startIndex){

	var len = arr.length,
		recent = arr[startIndex],
		startNum = recent;

	for(var i=startIndex+1; i<len; ++i){

		var curNum = arr[i];
		if(hash[i]){
			hash[i].push.apply(hash[startIndex], hash[i]);
			recent = curNum;
			if(startIndex === 0){
				console.log("break?");
			}
			break;
		}


		if(startIndex === 0){
			console.log("curNum: ", curNum, "recent: ", recent);
		}

		if(curNum < recent){
			longestNonDecreasingSequence(arr, i);
		}
		else if(curNum === recent){

			if(!hash[startIndex]){
				hash[startIndex] =[startNum];
			}
			
			hash[startIndex].push(arr[i]);
		}
		else{
			//greater
			longestNonDecreasingSequence(arr, i);

			if(!hash[startIndex]){
				hash[startIndex] =[startNum];
			}
			hash[startIndex].push(curNum);
			recent = curNum;
		}
		
	}

}

longestNonDecreasingSequence([2,1,3,7],0);
console.log(hash);
/*
hash = {};

longestNonDecreasingSequence([5,4,3,2],0);
console.log(hash);
*/