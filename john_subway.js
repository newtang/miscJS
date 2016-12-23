/**
https://www.hackerrank.com/contests/101hack42/challenges/johns-subway-commute
*/

function processData(input) {
    var seats = input.split(""),
        last = input.length - 1;
    
    if(seats[last] === 'E'){
        console.log(last);
        return;
    }
    
    if(seats[0] === 'E'){
        console.log(0);
        return;
    }
    
    var candidates = findCandidatesForJohn(seats),
        bestJohn,
        bestMax = Number.MIN_VALUE;

    for(var cand of candidates){
        var newSeats = seats.concat();
        newSeats[cand] = 'O';  //this is where john is sitting
        
        var result = findOptimalSeat(newSeats, cand, 0);
        
        console.log(result);
        
        if(result.max > bestMax){
            bestMax = result.max;
            bestJohn = result.john
        }
    }
        
    console.log("bestJohn", bestJohn);
}

function findCandidatesForJohn(seats){
    var candidates = [];
    for(var i=1, len = seats.length-1; i<=len; ++i){
        if(seats[i] === 'E' && seats[i+1] === 'E'){
            candidates.push(i);
        }
        else if( seats[i] === 'E' && seats[i-1] === 'E'){
            candidates.push(i);
        }
    }
    
    if(candidates.length === 0){
        for(var i=1, len = seats.length-1; i<=len; ++i){
            if(seats[i] === 'E'){
                candidates.push(i);
            }   
        }
    }
    
    
    return candidates;
}

function johnIsSurrounded(seats, john){
    if(seats[john-1] === 'O' && seats[john+1] === 'O'){
        return true;
    }
    return false;
}

function findOptimalSeat(seats, john, recurseLevel){
    var surr = johnIsSurrounded(seats, john);
    
    if(john === 2){
        console.log(seats);
        console.log("surrounded", surr);
        console.log(" ")
    }
        
    if(surr){
        return {
            max:recurseLevel,
            john: john
        } 
    }
    
    var nextToEmptySeat = findCandidatesForJohn(seats);    
    var values = [];
    
    if(john === 2){
        //console.log("seats", seats);
        //console.log("empty", nextToEmptySeat);
    }
    
    if(nextToEmptySeat.length === 0){
        return {
            max:recurseLevel,
            john: john
        }
    }
    

    var bestMax = Number.MIN_VALUE;
    var bestJohn = null;
    
    for(var seat of nextToEmptySeat){
        var newSeats = seats.concat();
        newSeats[seat] = 'O';
        var result = findOptimalSeat(newSeats, john, recurseLevel+1);
        
        if(result.max > bestMax){
            bestMax = result.max;
            bestJohn = result.john;
        }
        
        
    }
    //find seats empty on at least one side
    //put John in each one, and recurse through.
    
    return {
        john:bestJohn,
        max: bestMax
    };
    
    
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
