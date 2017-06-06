// console.log("ONE")
// function runningLogger (){
//     console.log("i am running");
// }
// runningLogger();

// console.log('TWO')
// function multiplyByTen (num){
//     num=num*10;
//     console.log (num);  //return doesn't work for some reason
// }
// multiplyByTen(5);

console.log("THREE")
function stringReturnOne(){
    console.log("this is a one string")
}
function stringReturnTwo(){
    console.log("this is a two string")
}
// stringReturnOne();
// stringReturnTwo();

console.log("FOUR")

function caller(param){
    if(typeof(param) == 'function')
    param();
}

console.log("FIVE")

function myDoubleConsoleLog(param1, param2){
    if(typeof(param1) == 'function' && typeof(param2) == 'function'){
        param1();
        param2();
    }
}
// myDoubleConsoleLog(stringReturnOne, stringReturnTwo);

console.log("SIX")

function callerTwo(param1){
    console.log('Starting');
    setTimeout(function(){
        if(typeof(param1) == 'function'){
            param1(stringReturnOne, stringReturnTwo);
            console.log('Ending?');
            console.log('Interesting');
        }
    }, 2000);
} 
callerTwo(myDoubleConsoleLog);

//Hard: Write a function named caller2 that has one parameter. Have it console.log the string 'starting', 
//wait 2 seconds, and then invokes the argument if the argument is a function. 
//(setTimeout may be useful for this one.) 
//The function should then console.log ‘ending?’ and return “interesting”. 
//Invoke this function by passing it myDoubleConsoleLog.
