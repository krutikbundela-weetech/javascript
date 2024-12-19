//* ==========================================
//*    ECMAScript Features (2016):
//* =========================================

//* ==============================
//*    Exponentiation Operator
//* ===============================

//? ES7 introduces a new mathematical operator called exponentiation operator. This operator is similar to using Math.pow() method. Exponentiation operator is represented by a double asterisk **. The operator can be used only with numeric values.

//* syntax
// base_value ** exponent_value;

//? Basic usage:
let base = 2;
let exponent = 3;
console.log("using Math.pow()", Math.pow(base, exponent));
console.log("using exponentiation operator", base ** exponent);

//? In expressions:
//! calculates the area of a circle with a radius of 5 units.
// let area = Math.PI * 5 ** 2;
// console.log(area.toFixed(2));

//* ==============================
//*  Array.includes()
//* ===============================
//? we have already cover in our world best JS course part-1 at 7:05:01 timeline


// The .includes() method in JavaScript is used to determine whether a string or an array contains a specified value. It returns a boolean value (true or false).

// Usage with Strings
// The .includes() method checks if a substring exists within a string.

// Syntax
// javascript
// Copy code
// string.includes(substring, start);
// substring: The string to search for.
// start (optional): The position in the string to start searching from (default is 0).
// Examples
// Basic Example

// javascript
// Copy code
// const text = "Hello, world!";
// console.log(text.includes("world")); // true
// console.log(text.includes("World")); // false (case-sensitive)
// With the start Parameter

// javascript
// Copy code
// const text = "JavaScript is fun!";
// console.log(text.includes("is", 10)); // false (starts searching after index 10)
// console.log(text.includes("is", 5));  // true
// Usage with Arrays
// The .includes() method checks if an array contains a specific element.

// Syntax
// javascript
// Copy code
// array.includes(element, start);
// element: The value to search for.
// start (optional): The position in the array to start searching from (default is 0).
// Examples
// Basic Example

// javascript
// Copy code
// const fruits = ["apple", "banana", "cherry"];
// console.log(fruits.includes("banana")); // true
// console.log(fruits.includes("grape"));  // false
// With the start Parameter

// javascript
// Copy code
// const numbers = [1, 2, 3, 4, 5];
// console.log(numbers.includes(3, 3)); // false (starts searching after index 3)
// console.log(numbers.includes(3, 2)); // true
// Key Points
// Case Sensitivity:

// The .includes() method is case-sensitive for both strings and arrays.
// javascript
// Copy code
// console.log("JavaScript".includes("javascript")); // false
// Search for Objects in Arrays:

// In arrays, .includes() checks for exact equality. If the array contains objects, it checks for the exact reference, not the content.
// javascript
// Copy code
// const obj = { key: "value" };
// const arr = [obj];
// console.log(arr.includes(obj)); // true
// console.log(arr.includes({ key: "value" })); // false
// NaN Handling in Arrays:

// Unlike indexOf(), .includes() can detect NaN in arrays.
// javascript
// Copy code
// const numbers = [1, 2, NaN];
// console.log(numbers.includes(NaN)); // true