/**
 * ! Higher Order Functions
 * Higher order functions are functions that can take other functions as arguments or return a function as their result.
 * They are a powerful feature of JavaScript that allows for more abstract and flexible code.
 * * Common examples of higher order functions include:
 *   - `map`: Applies a function to each element in an array and returns a new array with the results.
 *   - `filter`: Creates a new array with all elements that pass the test implemented by the provided function.
 *   - `reduce`: Executes a reducer function on each element of the array, resulting in a single output value.
 *   - `forEach`: Executes a provided function once for each array element.     
 * * ! Example of a higher order function
 * 
 * function greet(name) {
 *   return `Hello, ${name}!`;
 * }
 * function greetUser(greetingFunction, name) {
 *   return greetingFunction(name);
 * }
 * console.log(greetUser(greet, 'Alice')); // Output: Hello, Alice!
 * 
 * greetUser is a higher order function because it takes another function (greet - call back function) as an argument and calls it with the provided name. 
 * greet is a callback function that is passed to greetUser.
 * 
 * 
 */