var hash = {};

function longestNonDecreasingSequence(arr, startIndex){

	var len = arr.length,
		recent = null;

	for(var i=startIndex; i<len; ++i){
		
		var curNum = arr[i];

		if(recent === null){
			recent = curNum;
			if(hash[startIndex]){
				return;
			}
			else{
				hash[startIndex] = [curNum];
			}

		}
		else if(curNum < recent){
			longestNonDecreasingSequence(arr, i);
		}
		else if(curNum === recent){			
			hash[startIndex].push(curNum);
		}
		else{
			//greater
			longestNonDecreasingSequence(arr, i);
			hash[startIndex].push.apply(hash[startIndex], hash[i]);
			return;
		}
		
	}

}

function findLongest(hash){
	var max = 0,
		longest = null;
	for(var prop in hash){
		var len = hash[prop].length;
		if(len > max){
			max = len;
			longest = hash[prop];
		}
	}
	return longest;
}

longestNonDecreasingSequence([2,1,3,7],0);
//console.log(hash);
console.log(findLongest(hash));
hash = {};

longestNonDecreasingSequence([5,4,3,2],0);
console.log(findLongest(hash));

hash = {};

longestNonDecreasingSequence([2,5,1,1,1,1,1,1,1],0);
console.log(findLongest(hash));
