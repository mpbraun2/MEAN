    //iterate through the array
    var x = [3,5,"dojo", 'rocks', 'michael', 'sensei'];
    for (var i = 0; i<x.length; i++){
        console.log(x[i]);}
    //returns [3,5,"dojo", 'rocks', 'michael', 'sensei']

    //add 100 to the array with .push
    var x = [3,5,"dojo", 'rocks', 'michael', 'sensei'];
    x.push(100);
    console.log (x);
    //returns [3,5,"dojo", 'rocks', 'michael', 'sensei', 100]
    
    //Add a new array ["hello", "world", "JavaScript is Fun"] to variable x. Log x in the console and analyze how x looks now.
    var x = [3,5,"dojo", 'rocks', 'michael', 'sensei', ['hello', 'world', 'Javascript is fun']];
    console.log(x);
    //returns var x = [3,5,"dojo", 'rocks', 'michael', 'sensei', ['hello', 'world', 'Javascript is fun']]

    //Create a simple for loop that sums all the numbers between 1 to 500. Have console log the final sum.
    var sum = 0;
    for(var i = 1; i<501; i++){
        sum += i}
    console.log(sum);
    //returns sum = 125250

    //Write a loop that will go through the array [1, 5, 90, 25, -3, 0], find the minimum value, and then print it
    var arr = [1,5,90,25,-3,0];
    var min = arr[0];
    for (var i = 1; i < arr.length; i++){
        if (min > arr[i])
        min = arr[i];
    }
    console.log(min);
    //returns -3

    //Write a loop that will go through the array [1, 5, 90, 25, -3, 0], find the average of all of the values, and then print it
    var arr = [1,5,90,25,-3,0];
    var sum = 0;
    for(var i = 0; i<arr.length; i++){
        sum += arr[i];
    }
    avg = sum/arr.length;
    console.log (avg);
    //returns 19.666 (repeating)