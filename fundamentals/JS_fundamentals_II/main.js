function addAll(num1, num2){
    var sum=0
    for(var i = num1; i<= num2; i++){
        sum+=i
    }
    console.log(sum);
}
addAll(5,9);

function findMin(arr){
    var min = arr[0];
    for(var i = 1; i<arr.length; i++){
        if (min > arr[i]){
            min = arr[i];
        }
    }
    console.log(min);
}
findMin([1,3,5,7,1,-10]);

function avgArray(arr){
    var sum = 0;
    for (var i = 0; i<arr.length; i++){
        sum += arr[i]; 
        }
    avg=sum/arr.length;
    console.log(avg);
}
avgArray([1,3,5,8,22,22,90]);

//Assign these three to variables.

x = function addAll(num1, num2){
    var sum=0
    for(var i = num1; i<= num2; i++){
        sum+=i
    }
    console.log(sum);
}
y = function findMin(arr){
    var min = arr[0];
    for(var i = 1; i<arr.length; i++){
        if (min > arr[i]){
            min = arr[i];
        }
    }
    console.log(min);
}
z = function avgArray(arr){
    var sum = 0;
    for (var i = 0; i<arr.length; i++){
        sum += arr[i]; 
        }
    avg=sum/arr.length;
    console.log(avg);
}

var combined = {};
combined = {
    x:function addAll(num1, num2){
    var sum=0
    for(var i = num1; i<= num2; i++){
        sum+=i
    }
    console.log(sum);
},
    y:function findMin(arr){
    var min = arr[0];
    for(var i = 1; i<arr.length; i++){
        if (min > arr[i]){
            min = arr[i];
        }
    }
    console.log(min);
},
    z: function avgArray(arr){
    var sum = 0;
    for (var i = 0; i<arr.length; i++){
        sum += arr[i]; 
        }
    avg=sum/arr.length;
    console.log(avg);
}

}

var person = {};
person = {
    name:"Mike",
    distance_traveled: 0
}
function say_name(){
    console.log(person.name);}
say_name();
function say_something(param){
    console.log(person.name + ' says ' + param);
}
say_something("I am cool")
function walk(){
    console.log(person.name + " is walking");
    person.distance_traveled +=3;
    console.log(person.distance_traveled + ' miles traveled!');
}
walk();
function run(){
    console.log(person.name + " is running");
    person.distance_traveled +=10;
    console.log(person.distance_traveled + ' miles traveled!');
}
run();
function crawl(){
    console.log(person.name + ' is crawling');
    person.distance_traveled +=1;
    console.log(person.distance_traveled + ' miles traveled!');
}
crawl();


