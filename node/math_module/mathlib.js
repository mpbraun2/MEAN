module.exports = function(){
    return {
        greet: function(){
            console.log("we are now using a module!");
        },
        add: function(num1, num2){
            console.log("the sum is:", num1 + num2);
        },
    }
}

module.exports = function (){
  return {
    add: function(num1, num2) { 
         console.log("the sum is:", num1 + num2); 
    },
    multiply: function(num1, num2) {
         console.log("the product is:", num1 * num2);
    },
    square: function(num) {
         console.log("the square is:", num * num);
    },
    random: function(num1, num2) {
         console.log("your random number is:", ((Math.floor(Math.random(num1,num2)*100))));
    },
  }
};