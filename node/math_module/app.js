var my_module = require('./mathlib')();     //notice the extra invocation parentheses!
console.log(my_module);
my_module.add(4,9);
my_module.multiply(12,100); 
my_module.square(9);
my_module.random(1,100);




//node app.js to run in terminal