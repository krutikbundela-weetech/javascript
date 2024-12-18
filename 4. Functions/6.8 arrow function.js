// Different Arrow Function Syntaxes
// For arrow functions, you got a couple of different syntaxes which you can use - here's a summary.

// Important: Don't miss the "function only returns an object" special case at the end of this article!

// 1) Default syntax:

// const add = (a, b) => {
//     const result = a + b;
//     return result; // like in "normal" functions, parameters and return statement are OPTIONAL!
// };
// Noteworthy: Semi-colon at end, no function keyword, parentheses around parameters/ arguments.

// 2) Shorter parameter syntax, if exactly one parameter is received:

// const log = message => {
//     console.log(message); // could also return something of course - this example just doesn't
// };
// Noteworthy: Parentheses around parameter list can be omitted (for exactly one argument).

// 3) Empty parameter parentheses if NO arguments are received:

// const greet = () => {
//     console.log('Hi there!');
// };
// Noteworthy: Parentheses have to be added (can't be omitted)

// 4) Shorter function body, if exactly one expression is used:

// const add = (a, b) => a + b;
// Noteworthy: Curly braces and return statement can be omitted, expression result is always returned automatically

// 5) Function returns an object (with shortened syntax as shown in 4)):

// const loadPerson = pName => ({name: pName });
// Noteworthy: Extra parentheses are required around the object, since the curly braces would otherwise be interpreted as the function body delimiters (and hence a syntax error would be thrown here).

// That last case can be confusing: Normally, in JavaScript, curly braces always can have exactly one meaning.

// const person = { name: 'Max' }; // Clearly creates an object
// if (something) { ... } // Clearly used to mark the if statement block
// But when using arrow functions, curly braces can have two meanings:

// 1) Mark the function body (in default form)

// 2) Create an object which you want to return (in shorter function body form)

// To "tell" JavaScript what you want to do, wrap the expression (e.g. object creation) in parentheses like shown above.



//* ==========================================
//*  FAT ARROW FUNCTION
//* =========================================

//? In ECMAScript 6 (ES6), arrow functions, also known as fat arrow functions, were introduced as a concise way to write anonymous functions.

// const sum = function (a, b) {
//   let result = `The sum of ${a} and ${b} is ${a + b}.`;
//   console.log(result);
// };

// sum(5, 5);

// const sum1 = (a, b) => console.log(`The sum of ${a} and ${b} is ${a + b}.`);
// // sum(5, 5);

//! How to convert the same in fat arrow function
// Syntax
// const functionName = (param1, param2, ...) => {
//     // Function body
//     return result; // Optional
//   };


//   function krutik2() {
//       console.log("hello")
//       return 6876
// }


// const krutik11 = () => {
// console.log("hello")
// }

//   const krutik = () => {
//       console.log("hello");
//       return 6876
//     }
    
//     console.log("1. this will run before function")
//     var a =  krutik();
//     console.log("a:", a);
//     console.log("krutik ~ krutik:", krutik());
// console.log("2. this will run after function")

// todo NOTES

//?🚀 1: If the function body consists of a single expression, the braces {} and the return keyword can be omitted.
// const sum = (a, b) => `The sum of ${a} and ${b} is ${a + b}`;
// console.log(sum(5, 5));

//? 🚀 2: If there is only one parameter, the parentheses () around the parameter list can be omitted.
// const square = (a) => `The square of ${a} is  ${a * a}`;
// console.log(square(5));

//? 🚀 3: If there are no parameters, use an empty set of parentheses ().
// const greet = () => console.log("Plz LIKE SHARE & SUBSCRIBE!");
// greet();
