/**
 * ! Currying:
 * Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument.
 * This allows for partial application of functions, enabling more flexible and reusable code.
 */
const add = (a, b, c) => a + b + c;
// Currying the add function
const curriedAdd = (a) => (b) => (c) => a + b + c;
console.log(curriedAdd(1)(2)(3)); // Output: 6

// Example of using currying for partial application
const addFive = curriedAdd(5); // Partially applying the first argument
console.log(addFive(3)); // Output: 8

// Example of using currying for partial application with two arguments
const addFiveAndTwo = curriedAdd(5)(2); // Partially applying the first two arguments
console.log(addFiveAndTwo(3)); // Output: 10



// let multiply = function (x,y) {
//     console.log(x * y);
// }

// let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(5); // Output: 10
// multiplyByTwo(5, 3); // Output: 10 (ignores the second argument)
multiplyByTwo(3); // Output: 6
multiplyByTwo(10); // Output: 20

// ! Currying with function closure

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return function (...args2) {
      return curried(...args, ...args2);
    };
  };
}
const addCurried = curry((a, b, c) => a + b + c);
console.log(addCurried(1)(2)(3)); // Output: 6
console.log(addCurried(1, 2)(3)); // Output: 6
console.log(addCurried(1, 2, 3)); // Output: 6
console.log(addCurried(1)(2)(3)(4)); // Output: 10
console.log(addCurried(1)(2)(3)(4)(5)); // Output: 15

let multiply = function (x, y) {
  return function (y) {
    console.log(x * y);
  };
};

let multiplyByTwo = multiply(2);
multiplyByTwo(5); // Output: 10
multiplyByTwo(3); // Output: 6
multiplyByTwo(10); // Output: 20
// multiplyByTwo(5, 3); // Output: 10 (ignores the second argument)
