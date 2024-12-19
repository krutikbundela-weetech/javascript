//* ---------------------------------------------------
//*  First-Class Function - it's just a concept
//* ---------------------------------------------------
// A language feature where functions are treated as first-class citizens.
// Functions can be assigned to variables, passed as arguments to other functions, and returned from other functions.
//?   A "first-class function" means that functions can be treated as values, assigned to variables, and passed around as arguments.

// // Function declaration
// function sayHello(name) {
//   return "Hello, " + name + "!";
// }

// // // Assigning the function to a variable
// var greetFunction = sayHello;

// // // Using the variable as a function
// console.log(greetFunction("Thapa"));

//* -------------------------------
//*  Higher-Order Functions:
//* -------------------------------
//? Definition: A higher-order function is a function that takes one or more functions as arguments or returns a function as a result.

// A higher-order function is a function that either:
// Takes another function as an argument, or
// Returns a function as its result.
// Higher-order functions are a powerful feature of JavaScript, enabling functional programming patterns and more concise, reusable code.

// Why Use Higher-Order Functions?
// Abstraction: Simplify repetitive or common tasks.
// Code Reusability: Create generic functions that work with different logic.
// Functional Programming: Enable the use of map, filter, reduce, and other functional programming techniques.
// Examples of Higher-Order Functions
// 1. Passing a Function as an Argument
// javascript
// Copy code
// function greet(name) {
//   console.log(`Hello, ${name}!`);
// }

// function processUserInput(callback) {
//   const name = 'Alice';
//   callback(name); // Call the passed function
// }

// // Usage
// processUserInput(greet); // Outputs: "Hello, Alice!"
// Explanation:
// processUserInput is a higher-order function because it takes another function (callback) as an argument.
// greet is passed as the argument to be executed later.
// 2. Returning a Function
// javascript
// Copy code
// function createMultiplier(multiplier) {
//   return function (number) {
//     return number * multiplier;
//   };
// }

// const double = createMultiplier(2);
// const triple = createMultiplier(3);

// console.log(double(5)); // Outputs: 10
// console.log(triple(5)); // Outputs: 15
// Explanation:
// createMultiplier is a higher-order function because it returns a new function.
// The returned function remembers the multiplier value via closure.
// 3. Built-in Higher-Order Functions
// JavaScript provides several built-in higher-order functions for arrays:

// a. map()
// Applies a function to each element of an array and returns a new array.

// javascript
// Copy code
// const numbers = [1, 2, 3, 4];
// const squares = numbers.map(num => num * num);

// console.log(squares); // Outputs: [1, 4, 9, 16]
// b. filter()
// Filters elements of an array based on a condition.

// javascript
// Copy code
// const numbers = [1, 2, 3, 4, 5];
// const evenNumbers = numbers.filter(num => num % 2 === 0);

// console.log(evenNumbers); // Outputs: [2, 4]
// c. reduce()
// Reduces an array to a single value by repeatedly applying a function.

// javascript
// Copy code
// const numbers = [1, 2, 3, 4];
// const sum = numbers.reduce((acc, num) => acc + num, 0);

// console.log(sum); // Outputs: 10
// 4. Function Composition
// Combining smaller functions to create a more complex one.

// javascript
// Copy code
// function multiplyByTwo(num) {
//   return num * 2;
// }

// function addThree(num) {
//   return num + 3;
// }

// function compose(f, g) {
//   return function (x) {
//     return f(g(x));
//   };
// }

// const multiplyAndAdd = compose(addThree, multiplyByTwo);

// console.log(multiplyAndAdd(5)); // Outputs: 13 (5 * 2 + 3)
// Key Properties of Higher-Order Functions
// First-Class Functions:

// JavaScript treats functions as first-class citizens, meaning they can be:
// Stored in variables.
// Passed as arguments.
// Returned from other functions.
// Closures:

// Higher-order functions often rely on closures to maintain state or context.
// Practical Examples
// 1. Delayed Execution with setTimeout
// javascript
// Copy code
// function greet() {
//   console.log('Hello!');
// }

// setTimeout(greet, 2000); // Executes `greet` after 2 seconds
// 2. Event Handlers
// javascript
// Copy code
// document.querySelector('button').addEventListener('click', () => {
//   console.log('Button clicked!');
// });
// 3. Custom Iterators
// javascript
// Copy code
// function forEach(array, callback) {
//   for (let i = 0; i < array.length; i++) {
//     callback(array[i], i, array);
//   }
// }

// const numbers = [1, 2, 3];
// forEach(numbers, (num, index) => {
//   console.log(`Index ${index}: ${num}`);
// });
// Benefits of Higher-Order Functions
// Modularity: Break down complex logic into smaller, reusable pieces.
// Improved Readability: Declarative code is easier to understand (e.g., filter instead of a manual loop).
// Encourages Functional Patterns: Makes code predictable and reduces side effects.
// When to Use Higher-Order Functions
// When you need to perform repetitive operations on arrays or objects.
// When you want to abstract logic for code reusability.
// When implementing functional programming patterns.



//* -------------------------------
//*  Callback Functions:
//* -------------------------------
//? Definition: A callback function is a function passed as an argument to another function and is executed after the completion of a task.

//* Here is the example ✅
// Callback function
// function processUserInput(name, greetUser) {
//   console.log("Received input: " + name);
//   greetUser(name);
// }

// // Function to be used as a callback
// function greetUser(name) {
//   console.log(`Hello! ${name}`);
// }

// processUserInput("Vinod", greetUser);

// processUserInput is a higher-order function because it takes another function (callback) as an argument.
// greetUser is a callback function because it's passed as an argument to processUserInput and gets executed after the completion of the main task

//? ChatGPT
// Callback Functions in JavaScript
// A callback function is a function that is passed as an argument to another function and is invoked inside that function to complete a task or action.

// Callbacks are a fundamental concept in JavaScript and are commonly used for handling asynchronous operations like API requests, file reading, or timers.

// How Callback Functions Work
// A function (caller function) accepts another function (callback) as an argument.
// Inside the caller function, the callback is executed (often after some operations).
// Basic Example
// javascript
// Copy code
// function greet(name) {
//   console.log(`Hello, ${name}!`);
// }

// function processUserInput(callback) {
//   const name = 'Alice';
//   callback(name); // Calling the callback function
// }

// // Usage
// processUserInput(greet); // Outputs: "Hello, Alice!"
// Explanation:

// greet is passed as a callback to processUserInput.
// Inside processUserInput, the greet function is called with name as its argument.
// Synchronous Callback
// Callbacks can be used for synchronous tasks as well. In this case, the callback is executed immediately:

// javascript
// Copy code
// function calculate(a, b, callback) {
//   return callback(a, b);
// }

// function add(x, y) {
//   return x + y;
// }

// function multiply(x, y) {
//   return x * y;
// }

// // Usage
// console.log(calculate(5, 3, add)); // Outputs: 8
// console.log(calculate(5, 3, multiply)); // Outputs: 15
// Here:

// The calculate function accepts two numbers and a callback.
// The callback (add or multiply) is invoked immediately to compute the result.
// Asynchronous Callback
// Callbacks are especially useful for handling asynchronous operations, such as fetching data or waiting for a timer.

// Example: Using setTimeout
// javascript
// Copy code
// function delayedGreeting(callback) {
//   setTimeout(() => {
//     callback('Alice');
//   }, 2000);
// }

// function greet(name) {
//   console.log(`Hello, ${name}!`);
// }

// // Usage
// delayedGreeting(greet); // Outputs "Hello, Alice!" after 2 seconds
// Error-First Callbacks
// In many Node.js-style APIs, callbacks follow an error-first pattern, where the first argument represents an error (if any), and the second argument represents the result.

// javascript
// Copy code
// function fetchData(callback) {
//   const error = false; // Simulating no error
//   const data = { id: 1, name: 'John' };

//   if (error) {
//     callback('Error fetching data', null);
//   } else {
//     callback(null, data);
//   }
// }

// // Usage
// fetchData((err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result); // Outputs: { id: 1, name: 'John' }
//   }
// });
// Callbacks in Real-World Scenarios
// 1. Event Listeners
// javascript
// Copy code
// document.getElementById('myButton').addEventListener('click', () => {
//   console.log('Button clicked!');
// });
// Here, the callback is executed when the button is clicked.

// 2. Array Methods
// Callbacks are heavily used in array methods like map, filter, and forEach:

// javascript
// Copy code
// const numbers = [1, 2, 3, 4];

// // Using map with a callback
// const doubled = numbers.map(num => num * 2);
// console.log(doubled); // Outputs: [2, 4, 6, 8]
// Advantages of Callback Functions
// Asynchronous Programming:

// Handle tasks that take time, like fetching data or file reading.
// Reusability:

// Pass different functions as callbacks to handle various scenarios.
// Flexibility:

// Decouple the core logic from the specific task handled by the callback.
// Challenges with Callbacks: Callback Hell
// When multiple nested callbacks are used, it can lead to messy and hard-to-read code, often called "callback hell."

// Example of Callback Hell
// javascript
// Copy code
// function fetchData(callback) {
//   setTimeout(() => {
//     console.log('Data fetched');
//     callback();
//   }, 1000);
// }

// function processData(callback) {
//   setTimeout(() => {
//     console.log('Data processed');
//     callback();
//   }, 1000);
// }

// function saveData(callback) {
//   setTimeout(() => {
//     console.log('Data saved');
//     callback();
//   }, 1000);
// }

// // Nested Callbacks
// fetchData(() => {
//   processData(() => {
//     saveData(() => {
//       console.log('All tasks completed!');
//     });
//   });
// });
// Solution: Promises or Async/Await
// Instead of callbacks, modern JavaScript uses Promises and async/await for better readability and error handling.

// javascript
// Copy code
// function fetchData() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log('Data fetched');
//       resolve();
//     }, 1000);
//   });
// }

// async function handleData() {
//   await fetchData();
//   console.log('All tasks completed!');
// }

// handleData();
// Summary
// Callback functions are a powerful tool for handling both synchronous and asynchronous tasks.
// They are widely used in JavaScript, especially in APIs and libraries.
// To avoid "callback hell," consider transitioning to Promises or async/await for complex workflows.
//* ================================
//*  Callback hell
//* ================================

//? Callback hell, also known as the Pyramid of Doom, refers to a situation in asynchronous JavaScript programming where multiple nested callbacks are used to handle asynchronous operations. This often results in code that is difficult to read, understand, and maintain due to its deeply nested structure.

const getStudentData = () => {
  setTimeout(() => {
    console.log("Hi, My name is vinod");
    setTimeout(() => {
      console.log("Hi, My middleName is Bahadur");
      setTimeout(() => {
        console.log("Hi, My lastName is Thapa");
        setTimeout(() => {
          console.log("Hi, I like to code ");
          setTimeout(() => {
            console.log("Hi, I live in pune");
            setTimeout(() => {
              console.log("Hi, I was born in Pokhara, Nepal");
              setTimeout(() => {
                console.log("Hi, I love to play football");
                setTimeout(() => {
                  console.log("Hi,I was a national Player in athletics ");
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
};

getStudentData();

//* -------------------------------
//*  Closure:
//* -------------------------------

//? A closure is created when an inner function has access to the variables of its outer function, even after the outer function has finished executing.

function outerFunction() {
  var outerVariable = "I'm from outer";

  function innerFunction() {
    console.log(outerVariable);
  }
  return innerFunction;
}

var closureFunction = outerFunction();
console.dir(closureFunction);
// closureFunction();

// Here when we are calling the closureFunction() it is actually going to call the innerFunction() but in our executionContext the outerFunction is already popped  out. Still we can access the outerVariable value and how we are able to access it, is what closure all about ?

// We just need to know that an inner function has always access to the variables of the outer (parent) function. That's it.

// Why is it like that? It's because the variable object of the parent function stays in memory even after the function returns, and our inner function has access to this variable object through the scope chain.

// It might be beneficial to clarify that the call stack is simply the execution order and it is not the same thing as the computer's memory, which is where the variables are held.  So even though the function was removed from the call stack, its variables are still maintained in memory until they are no longer needed and garbage collection comes and removes them.

//* also one more example

function multiplier(factor) {
  return function (number) {
    console.log(number, factor);
    return number * factor;
  };
}

const double = multiplier(2);
console.log(double(5));

//* ===================================
//* Interview Question:
//* ===================================
//! Write a program to perform mathematical operations using callback functions and two variables in JavaScript.

//? Instructions:
//? Define a higher-order function called mathOperation that takes three arguments: x, y, and operation.
//? Implement two callback functions:
//? add: Takes two numbers x and y and returns their sum.
//? sub: Takes two numbers x and y and returns the result of subtracting x from y.
//? Use the mathOperation function to perform addition and subtraction operations on two variables a and b.
//? Display the results of the operations.

const mathOperation = (a, b, operation) => {
  return operation(a, b);
};

const add = (a, b) => {
  return a + b;
};

const sub = (a, b) => {
  return b - a;
};

console.log(mathOperation(5, 15, add));
console.log(mathOperation(5, 15, sub));
