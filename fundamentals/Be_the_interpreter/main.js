//example One
var hello = 'interesting';
function example(){
    var hello = 'hi!';
    console.log(hello);
}
example();
console.log(hello);

//declarations get hoisted
var hello;
function example() {
    var hello;
    hello = "hi";
    console.log(hello);
}
//assignments and invocations maintain order
hello = 'interesting';
example();
console.log(hello);

//problem 1:
console.log("problem 1");

console.log(first_variable);
var first_variable = "Yipee I was first!";
function firstFunc() {
  first_variable = "Not anymore!!!";
  console.log(first_variable);
}
console.log(first_variable);

//answer 1:
console.log("answer 1");

var first_variable;
function firstFunc(){
    first_variable = "Not anymore!!!";
    console.log(first_variable);
}
console.log(first_variable);
first_variable = "yippee I was first";
console.log(first_variable);

//problem 2:
console.log("problem 2");

var food = "Chicken";
function eat() {
  food = "half-chicken";
  console.log(food);
  var food = "gone";       // CAREFUL!
  console.log(food);
}
eat();
console.log(food);

//answer 2:
console.log("answer 2");

var food;
function eat(){
    var food;
    food = 'half chicken';
    console.log(food);
    food = 'gone';
    console.log(food);
}
food = 'Chicken';
eat();
console.log(food);

//problem 3:
console.log("problem 3");

var new_word = "NEW!";
function lastFunc() {
  new_word = "old";
}
console.log(new_word);

//answer 3:
console.log("answer 3");

var new_word;
function lastFunc(){
    new_word = 'old';
}
new_word = "NEW!"
console.log(new_word);