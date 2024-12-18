// function vs methods
// ChatGPT said:
// ChatGPT
// In JavaScript, functions and methods are closely related but serve slightly different roles based on how they are defined and used. Here's a clear distinction between the two:

// 1. Functions
// A function is a standalone block of code designed to perform a specific task. It can exist independently of any object and is typically invoked using its name.

// Key Characteristics
// Declared using the function keyword or as an arrow function.
// Can be called independently, without being tied to an object.
// May accept arguments and return a value.
// Not inherently associated with any object.
// Examples
// javascript
// Copy code
// // Regular Function
// function greet(name) {
//   return `Hello, ${name}!`;
// }
// console.log(greet("Alice")); // Output: "Hello, Alice!"

// // Arrow Function
// const multiply = (a, b) => a * b;
// console.log(multiply(3, 4)); // Output: 12
// 2. Methods
// A method is a function that is defined as a property of an object. It is called using the object it belongs to and typically performs actions related to that object.

// Key Characteristics
// Defined within an object or a class.
// Called with the object it is associated with.
// The this keyword inside a method refers to the object the method belongs to.
// Examples
// javascript
// Copy code
// // Method in an Object
// const person = {
//   name: "Alice",
//   greet() {
//     return `Hello, my name is ${this.name}.`;
//   },
// };
// console.log(person.greet()); // Output: "Hello, my name is Alice."

// // Method in a Class
// class Calculator {
//   add(a, b) {
//     return a + b;
//   }
// }

// const calc = new Calculator();
// console.log(calc.add(2, 3)); // Output: 5
// Key Differences Between Functions and Methods
// Aspect	Functions	Methods
// Definition	Independent blocks of code.	Functions defined as properties of objects.
// Invocation	Called directly by their name.	Called using the object or class they belong to.
// this Context	Not tied to any specific this unless explicitly bound.	Refers to the object or class they belong to.
// Usage	General-purpose code reuse.	Operations and behaviors specific to objects.
// Example: Function vs Method
// javascript
// Copy code
// // Function (Standalone)
// function add(a, b) {
//   return a + b;
// }
// console.log(add(5, 3)); // Output: 8

// // Method (Inside an Object)
// const mathOperations = {
//   add(a, b) {
//     return a + b;
//   },
// };
// console.log(mathOperations.add(5, 3)); // Output: 8
// When to Use Functions vs Methods
// Use Functions when:

// The logic is general and not tied to any particular object.
// You need a utility or helper function that can be reused globally.
// Use Methods when:

// The logic is specific to an object or class.
// You need to manipulate or access data inside an object using this.
// Advanced Note: Functions as Methods
// A function can behave like a method if you assign it to an object.

// Example:
// javascript
// Copy code
// function sayHello() {
//   return `Hello, ${this.name}!`;
// }

// // Assign as a method to an object
// const person = {
//   name: "Alice",
//   greet: sayHello,
// };

// console.log(person.greet()); // Output: "Hello, Alice!"
// Here, sayHello becomes a method of the person object because it is invoked in the context of person.

// Conclusion
// Functions: Independent code blocks that can be used globally or reused in multiple places.
// Methods: Functions that are attached to objects or classes, operating within the context of that object or class.