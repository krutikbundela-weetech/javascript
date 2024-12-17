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

// !Problems
// var a = 10
// var a = 10
// var ma more than one time redeclare krriii sakaai error nai aave 
// *let ma aavseee
// * var only know global skope and function scope 
//so var ne agar if--else-- ma lakh su to b a global variable tarike work krseee 
//only local scope tyaare jj lese jytaare ene function ma lakhvaa ma aave

//? Hoisting: 
// (print before declaration)
// console.log(userName);    //output ma undefined aavse le
// var userName = 10;


let xyz  = 100

 xyz  = 1000

krutik();
xyz = 1890
console.log("Outside a funtion xyz:", xyz);

function krutik(){
    console.log("Inside a functionName ~ xyz:", xyz);

}


//* ======================================
//*  use strict mode
//* =====================================
// 'use strict'; // aa laksu pachi niche maate error aapse
// var a = 10
// var a = 10

//* ======================================
//* LET AND CONST - EcmaScript 2015
//* =====================================

//? let Keyword:  The let keyword is used to declare variables with block scope. Variables declared with let are mutable, meaning their values can be reassigned.

// var Name1 = "krutik";
// var Name1 = "ram";
// console.log(Name);

// let Name = "krutik";
// let Name = "ram" //? cnnont re-declare 
// console.log("before changing: ",Name);
//  Name = "ram"
// console.log("after changing: ", Name);

//? const Keyword: The const keyword is used to declare variables with block scope, but once a value is assigned to a const variable, it cannot be reassigned. const variables are immutable.

// const pi=3.142
// const Name = "krutik";
// Name = "ram";
// console.log(Name);

// //? 1st show what var can do
var name = "krutik";

if (true) {
  var name = "ram";
  console.log(name);
}

// name = "technical";
// console.log(name);

//? ex2: with the help of let keyword
// let name = "krutik";

// if (true) {
//   name = "ram";
//   console.log(name);
// }

// name = "technical";
// console.log(name);

//? ex2: with the help of let keyword
// const name = "krutik";

// if (true) {
//   const name = "ram";
//   console.log(name);
// }

// name = "technical";
// console.log(name);

// var
// if (true) {
//   var name = "ram";
//   console.log(name);
// }
// name = "technical";
// console.log(name);

// let
// if (true) {
//   let name = "ram";
//   console.log(name);
// }
// // name = "technical";
// console.log(name);