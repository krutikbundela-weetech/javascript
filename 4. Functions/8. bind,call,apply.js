//* call, apply, and bind are methods available in JavaScript for managing the this value of a function.
//! all 3 methods are only used in function not in object

//* call:
//! Syntax: function.call(thisArg, arg1, arg2, ...)
//? Invokes a function with a specified this value and individual arguments.

// function greet(message) {
//   console.log(`${message}, ${this.name}!`);
// }

// const person = {
//   name: "John",
// };

// greet.call(person, "hello");

//* apply:
// Syntax: function.apply(thisArg, [arg1, arg2])
//? Invokes a function with a specified this value and an array or array-like object of arguments.

// function greet(message) {
//   console.log(`${message}, ${this.name}!`);
// }

// const person = { name: "John" };

// greet.apply(person, ["hello"]);

//todo In modern JavaScript, with the introduction of the spread operator (...), the need for apply has diminished, and you can often achieve the same result with call and the spread operator.

// function greet(message, punctuation) {
//   console.log(`${message}, ${this.name}${punctuation}`);
// }

// const person = { name: "John" };
// const argsArray = ["Hello", "!"];

// // Using apply
// greet.apply(person, argsArray);
// // Output: Hello, John!

// // Using call and spread operator
// greet.call(person, ...argsArray);
// // Output: Hello, John!

//* bind:
//? Syntax: function.bind(thisArg, arg1, arg2, ...)
//* Creates a new function with a specified this value and any initial arguments. Unlike call and apply, bind does not immediately invoke the function but returns a new function that can be invoked later.

//? Use Cases:
//* Use call when you want to invoke a function with a specific this value and individual arguments.

//* Use apply when you want to invoke a function with a specific this value and an array or array-like object of arguments.

//* Use bind when you want to create a new function with a specific this value and initial arguments without immediately invoking it. The new function can be invoked later.

const bioData = {
  name: "Thapa Technical",
  age: 30,
  gender: "Male",

  greet: function () {
    console.log(
      `Hi, I'm ${this.name}. I'm ${this.age} years old, and I identify as ${this.gender}.`
    );
  },
};
// // Example usage:
// // bioData.greet();
// bioData.greet.call(bioData);

//? Imagine you have two objects: bioData and student. The greet method is defined in the bioData object, and you want to use it to display the information from the student object.

let student = { name: "vinod", age: "29", gender: "male" };
// bioData.greet.call(student);

// bioData.greet.apply(student);

// student = bioData.greet.bind(student);
// student();

// Explanation
// The greet method is defined in the bioData object, and it uses this to refer to its own properties.
// student is a separate object with properties like name, age, and gender.
// By using call(student), you are telling the greet method to temporarily consider the student object as its own object (this), allowing it to access and display the properties of the student object.
// So, call is a way to borrow a method from one object and use it for another object, temporarily setting the this value to the provided object.

//* the main difference is that call immediately invokes the function with the specified this value, while bind creates a new function with the specified this value and initial arguments but doesn't invoke the function immediately. You need to invoke the new function returned by bind separately.

// // more example
function greet(message) {
  console.log(`${message}, ${this.name}!`);
}

const person = { name: "vinod" };

greet.call(person, "Hello");
greet.apply(person, ["Hey"]);

const anotherWay = greet.bind(person, "hello");
anotherWay();


// bind()
// ChatGPT said:
// ChatGPT
// The bind() method in JavaScript is used to create a new function with a specific value of this and, optionally, pre-defined arguments. It is particularly useful for controlling the this context of a function, especially in scenarios where the this value might otherwise change dynamically.

// Syntax
// javascript
// Copy code
// function.bind(thisArg, ...args);
// thisArg: The value to be used as this when the new function is invoked.
// args (optional): Arguments to pre-set for the function (also called partial application).
// The bind() method returns a new function but does not invoke it immediately. The new function can be called later.

// How bind() Works
// 1. Controlling the this Context
// The bind() method ensures that a specific this value is always used, regardless of how the function is called.

// Example: Without bind()
// javascript
// Copy code
// const person = {
//   name: "Alice",
//   greet() {
//     console.log(`Hello, my name is ${this.name}`);
//   },
// };

// const greet = person.greet; // Function reference
// greet(); // Output: "Hello, my name is undefined" (because `this` is not bound)
// Example: With bind()
// javascript
// Copy code
// const person = {
//   name: "Alice",
//   greet() {
//     console.log(`Hello, my name is ${this.name}`);
//   },
// };

// const greet = person.greet.bind(person); // Bind `this` to `person`
// greet(); // Output: "Hello, my name is Alice"
// 2. Partial Application
// bind() can also pre-set arguments for a function.

// Example: Pre-Setting Arguments
// javascript
// Copy code
// function multiply(a, b) {
//   return a * b;
// }

// const double = multiply.bind(null, 2); // Pre-set `a = 2`
// console.log(double(5)); // Output: 10 (2 * 5)

// const triple = multiply.bind(null, 3); // Pre-set `a = 3`
// console.log(triple(5)); // Output: 15 (3 * 5)
// 3. Using bind() in Event Listeners
// In event listeners, this typically refers to the element that triggered the event. Use bind() to ensure this refers to a specific object.

// Example: Fixing this in Event Handlers
// javascript
// Copy code
// class Button {
//   constructor(label) {
//     this.label = label;
//   }

//   handleClick() {
//     console.log(`Button clicked: ${this.label}`);
//   }
// }

// const button = new Button("Submit");
// const buttonElement = document.querySelector("button");

// buttonElement.addEventListener("click", button.handleClick.bind(button));
// // Output on click: "Button clicked: Submit"
// Without bind(), this would refer to buttonElement, not the Button object.

// Why Use bind()?
// Preserving this in Callbacks
// When passing a method as a callback, the this context can get lost. Use bind() to preserve it.

// Partial Application
// Pre-set some arguments of a function to create specialized versions.

// Reusability
// Create reusable functions with fixed contexts and arguments.

// Key Differences Between bind(), call(), and apply()
// Method	Use Case	Invocation	Arguments
// bind()	Create a new function with fixed this context.	Delayed (not invoked immediately).	Passed as additional arguments.
// call()	Call a function with a specific this context.	Immediately invoked.	Passed as individual arguments.
// apply()	Call a function with a specific this context.	Immediately invoked.	Passed as an array of arguments.
// Example
// javascript
// Copy code
// function greet(greeting, punctuation) {
//   console.log(`${greeting}, my name is ${this.name}${punctuation}`);
// }

// const person = { name: "Alice" };

// // Using `bind()`
// const boundGreet = greet.bind(person, "Hello");
// boundGreet("!"); // Output: "Hello, my name is Alice!"

// // Using `call()`
// greet.call(person, "Hi", "!"); // Output: "Hi, my name is Alice!"

// // Using `apply()`
// greet.apply(person, ["Hey", "!"]); // Output: "Hey, my name is Alice!"
// Common Use Cases
// 1. Fixing this in a Method
// javascript
// Copy code
// const person = {
//   name: "Alice",
//   greet() {
//     console.log(`Hi, ${this.name}`);
//   },
// };

// const greet = person.greet.bind(person);
// setTimeout(greet, 1000); // Output: "Hi, Alice"
// 2. Partial Application
// javascript
// Copy code
// function subtract(a, b) {
//   return a - b;
// }

// const subtractFive = subtract.bind(null, 5);
// console.log(subtractFive(10)); // Output: -5 (5 - 10)
// 3. Reusable Event Handlers
// javascript
// Copy code
// class App {
//   constructor(name) {
//     this.name = name;
//   }

//   onClick() {
//     console.log(`App clicked: ${this.name}`);
//   }
// }

// const app = new App("MyApp");
// document.querySelector("button").addEventListener("click", app.onClick.bind(app));
// Summary
// bind() creates a new function with a fixed this context and optionally pre-sets arguments.
// It does not invoke the function immediately; instead, it returns a new function to be called later.
// It’s useful for handling callback functions and ensuring the correct this context.
// Let me know if you'd like further clarification or examples! 😊






// You said:
// call() 
// ChatGPT said:
// ChatGPT
// The call() method in JavaScript is used to invoke a function with a specific this value and arguments provided individually. It allows you to explicitly set the this context for a function, which is useful when you want to control the execution context, especially in situations like callbacks or event handling.

// Syntax of call()
// javascript
// Copy code
// function.call(thisArg, arg1, arg2, ...);
// thisArg: The value to be used as this when the function is invoked.
// arg1, arg2, ...: The arguments to be passed to the function (individual arguments, not an array).
// How call() Works
// The call() method calls the function immediately and allows you to specify the value of this (the context of the function) and pass arguments one by one.
// Example 1: Using call() to Set this
// javascript
// Copy code
// const person = {
//   name: "Alice",
//   greet() {
//     console.log(`Hello, my name is ${this.name}`);
//   }
// };

// const person2 = {
//   name: "Bob"
// };

// // Using `call()` to invoke `greet()` with a different `this` value
// person.greet.call(person2); // Output: "Hello, my name is Bob"
// In this example:

// person.greet.call(person2) calls the greet method from person but sets this to person2.
// So, this.name refers to person2.name, and the output is "Hello, my name is Bob".
// Example 2: Passing Arguments with call()
// javascript
// Copy code
// function introduce(city, country) {
//   console.log(`${this.name} is from ${city}, ${country}.`);
// }

// const person = {
//   name: "Alice"
// };

// // Using `call()` to pass arguments individually
// introduce.call(person, "New York", "USA");
// // Output: "Alice is from New York, USA."
// Here:

// introduce.call(person, "New York", "USA") calls the introduce function with this set to person, and the arguments "New York" and "USA" are passed individually.
// Example 3: Borrowing Methods from Other Objects
// You can use call() to borrow methods from other objects and apply them to different objects.

// javascript
// Copy code
// const car = {
//   make: "Toyota",
//   model: "Corolla",
//   displayInfo() {
//     console.log(`Car: ${this.make} ${this.model}`);
//   }
// };

// const bike = {
//   make: "Honda",
//   model: "CBR"
// };

// // Borrowing the `displayInfo` method from `car` object for the `bike` object
// car.displayInfo.call(bike); // Output: "Car: Honda CBR"
// In this case, bike doesn't have the displayInfo() method, but we borrow it from car using call(). The this context is changed to bike.

// Example 4: Using call() with Functions in Constructor
// You can use call() within constructors to share functionality between different objects.

// javascript
// Copy code
// function Animal(name, sound) {
//   this.name = name;
//   this.sound = sound;
// }

// function Dog(name) {
//   // Borrow constructor functionality from Animal
//   Animal.call(this, name, "Woof");
// }

// const dog = new Dog("Buddy");
// console.log(dog.name);  // Output: Buddy
// console.log(dog.sound); // Output: Woof
// Here, the Dog constructor borrows the functionality of the Animal constructor using call(), and it sets this.name and this.sound.

// Key Differences Between call(), apply(), and bind()
// Method	Use Case	Invocation	Arguments
// call()	Invoke a function with a specific this context.	Immediately invoked.	Arguments are passed individually.
// apply()	Invoke a function with a specific this context.	Immediately invoked.	Arguments are passed as an array.
// bind()	Create a new function with a specific this context.	Not invoked immediately.	Arguments can be pre-set and passed later.
// Example: call() vs apply()
// javascript
// Copy code
// function greet(greeting, punctuation) {
//   console.log(`${greeting}, my name is ${this.name}${punctuation}`);
// }

// const person = { name: "Alice" };

// // Using `call()` to pass arguments individually
// greet.call(person, "Hello", "!"); // Output: "Hello, my name is Alice!"

// // Using `apply()` to pass arguments as an array
// greet.apply(person, ["Hi", "?"]); // Output: "Hi, my name is Alice?"
// Use Cases for call()
// Changing the this context:

// Use call() when you want to call a method on an object but refer to another object as this.
// Calling Functions Immediately:

// It’s useful when you need to invoke a function and control the this context on the fly.
// Function Borrowing:

// Use call() to borrow methods from other objects.
// Conclusion
// The call() method is a powerful tool for:

// Explicitly setting the this context when calling a function.
// Passing arguments individually.
// Borrowing methods from other objects.
// It provides a way to control and manage function invocations and contexts in JavaScript. Let me know if you’d like more examples or clarification on any part! 😊






// You said:
// apply()
// ChatGPT said:
// ChatGPT
// The apply() method in JavaScript is very similar to the call() method. It is used to invoke a function with a specific this value, but the main difference lies in how arguments are passed to the function. While call() takes arguments individually, apply() takes the arguments as an array or array-like object.

// Syntax of apply()
// javascript
// Copy code
// function.apply(thisArg, [arg1, arg2, ...]);
// thisArg: The value to be used as this when the function is invoked.
// [arg1, arg2, ...]: An array or array-like object containing the arguments to pass to the function.
// How apply() Works
// The apply() method calls the function immediately with the provided this context and arguments. The difference between apply() and call() is that apply() accepts the arguments as an array, while call() takes the arguments individually.

// Example 1: Using apply() to Set this
// javascript
// Copy code
// const person = {
//   name: "Alice",
//   greet() {
//     console.log(`Hello, my name is ${this.name}`);
//   }
// };

// const person2 = {
//   name: "Bob"
// };

// // Using `apply()` to invoke `greet()` with a different `this` value
// person.greet.apply(person2); // Output: "Hello, my name is Bob"
// Here, person.greet.apply(person2) calls the greet method from person, but this is set to person2. This results in the output "Hello, my name is Bob".

// Example 2: Passing Arguments with apply()
// javascript
// Copy code
// function introduce(city, country) {
//   console.log(`${this.name} is from ${city}, ${country}.`);
// }

// const person = {
//   name: "Alice"
// };

// // Using `apply()` to pass arguments as an array
// introduce.apply(person, ["New York", "USA"]);
// // Output: "Alice is from New York, USA."
// Here, introduce.apply(person, ["New York", "USA"]) passes "New York" and "USA" as an array to the introduce function.

// Example 3: Using apply() with Math Methods
// The apply() method is commonly used with built-in methods such as Math.max() and Math.min(), which require individual arguments. Since these methods don’t accept an array directly, apply() is a great way to pass an array of values to them.

// javascript
// Copy code
// const numbers = [1, 2, 3, 4, 5];

// // Using `apply()` to pass an array to Math.max()
// const maxNumber = Math.max.apply(null, numbers);
// console.log(maxNumber); // Output: 5

// // Using `apply()` to pass an array to Math.min()
// const minNumber = Math.min.apply(null, numbers);
// console.log(minNumber); // Output: 1
// In this example:

// Math.max.apply(null, numbers) invokes Math.max() with the numbers array, effectively finding the largest number.
// null is passed as the first argument to specify that we are not setting a specific this context (since Math.max() does not need it).
// Example 4: Borrowing Methods with apply()
// Just like call(), apply() can also be used to borrow methods from other objects.

// javascript
// Copy code
// const car = {
//   make: "Toyota",
//   model: "Corolla",
//   displayInfo() {
//     console.log(`Car: ${this.make} ${this.model}`);
//   }
// };

// const bike = {
//   make: "Honda",
//   model: "CBR"
// };

// // Borrowing the `displayInfo` method from `car` object for the `bike` object
// car.displayInfo.apply(bike); // Output: "Car: Honda CBR"
// Here, car.displayInfo.apply(bike) borrows the displayInfo method from the car object and applies it to the bike object. The this value is set to bike, so the output reflects the bike properties.

// Example 5: Using apply() with a Constructor
// You can use apply() to invoke a constructor function with specific arguments, especially when you're working with inheritance.

// javascript
// Copy code
// function Animal(name, sound) {
//   this.name = name;
//   this.sound = sound;
// }

// function Dog(name) {
//   // Borrow constructor functionality from Animal
//   Animal.apply(this, [name, "Woof"]);
// }

// const dog = new Dog("Buddy");
// console.log(dog.name);  // Output: Buddy
// console.log(dog.sound); // Output: Woof
// In this example, the Dog constructor borrows the functionality of the Animal constructor using apply(), passing the arguments as an array.

// Key Differences Between call(), apply(), and bind()
// Method	Use Case	Invocation	Arguments
// call()	Invoke a function with a specific this context.	Immediately invoked.	Arguments passed individually.
// apply()	Invoke a function with a specific this context.	Immediately invoked.	Arguments passed as an array.
// bind()	Create a new function with a specific this context.	Not invoked immediately.	Arguments can be pre-set and passed later.
// Example: call() vs apply()
// javascript
// Copy code
// function greet(greeting, punctuation) {
//   console.log(`${greeting}, my name is ${this.name}${punctuation}`);
// }

// const person = { name: "Alice" };

// // Using `call()` to pass arguments individually
// greet.call(person, "Hello", "!"); // Output: "Hello, my name is Alice!"

// // Using `apply()` to pass arguments as an array
// greet.apply(person, ["Hi", "?"]); // Output: "Hi, my name is Alice?"
// Common Use Cases for apply()
// Working with Arrays and Math Functions:

// Use apply() to pass an array to functions like Math.max(), Math.min(), or Function.prototype.apply().
// Borrowing Methods:

// Use apply() to borrow methods from other objects and apply them to different objects.
// Constructor Functions:

// Use apply() to invoke constructor functions with specific arguments, especially in inheritance.
// Conclusion
// The apply() method is a versatile tool for:

// Setting a specific this context when invoking functions.
// Passing arguments as an array.
// Borrowing functions from other objects.
// Calling functions with variable-length arguments in a concise way.