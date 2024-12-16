//* ====================================
//* Values and Variable in JavaScript
//* ====================================

//* In JavaScript, values and variables are fundamental concepts that form the basis of programming.

//* Values:  A value is a piece of information that a program can work with. It can be a number, text, true/false, or more complex data.

//* Variables: A variable is a container that holds a value. It has a name and can be used to store and manipulate data in a program.

// console.log("welcome to best js course ");

// var myAge;
// myAge = 2000;
// console.log(myAge);

// const , let , var

// var krutik1234 = "hello world";
// console.log("before changing:", krutik1234);

// arbaz_123 = "krutik";
// console.log("after changing:", krutik1234);

//  const conditon = true

//! Let's test
var my_firstName = "John";
console.log("before:", my_firstName);

my_firstName = "sneha";
 var my_firstName1 = 65456465;
console.log("after changing:", my_firstName);
//? Explanation: This is a valid variable name. It starts with a letter, and the subsequent characters include letters, numbers, and an underscore. Follows JavaScript naming rules.

// var _myLastName$ = "Doe";
// console.log("_myLastName:", _myLastName$);
//? Explanation: This is a valid variable name. It starts with an underscore, and the subsequent characters include letters, numbers, and a dollar sign. Follows JavaScript naming rules.

// var 123myAge = 25;
var myAge123 = 25;
// console.log("myAge123:", myAge123);
//? Explanation: This is not a valid variable name. It starts with a number, which is not allowed as per JavaScript naming rules. Variable names cannot begin with a digit.

// var $cityName = "New York";
//? Explanation: This is a valid variable name. It starts with a dollar sign, and the subsequent characters include letters. Follows JavaScript naming rules.

// var my@Email = "john@example.com";
//? Explanation: This is not a valid variable name. It includes the special character '@', which is not allowed in JavaScript variable names. Only letters, numbers, underscores, and dollar signs are allowed.


// ES6

// 3 types of Declaring Variables

// 1. var
// 2. let
// 3. const 

//? 1. var :



let xyz  = 100

 xyz  = 1000

krutik();
xyz = 1890
console.log("Outside a funtion xyz:", xyz);

function krutik(){
    console.log("Inside a functionName ~ xyz:", xyz);

}