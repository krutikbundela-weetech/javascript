// In JavaScript, objects are collections of key-value pairs where keys are strings (or symbols) and values can be of any data type, including other objects, arrays, or functions. Objects are a core feature of JavaScript and are widely used to store and organize data.

// Creating Objects
// 1. Object Literal Syntax
// The simplest and most common way to create an object:

// javascript
// Copy code
// const person = {
//   name: "Krutik",
//   age: 25,
//   profession: "Developer",
// };
// console.log(person.name); // Output: Krutik
// 2. Using new Object()
// You can create an object using the Object constructor:

// javascript
// Copy code
// const car = new Object();
// car.make = "Toyota";
// car.model = "Camry";
// car.year = 2024;

// console.log(car.make); // Output: Toyota
// 3. Using Object.create()
// This creates a new object with the specified prototype.

// javascript
// Copy code
// const prototypeObject = {
//   greet() {
//     console.log("Hello!");
//   },
// };

// const obj = Object.create(prototypeObject);
// obj.greet(); // Output: Hello!
// Accessing Object Properties
// You can access object properties in two ways:

// Dot Notation:

// javascript
// Copy code
// console.log(person.name); // Output: Krutik
// Bracket Notation (useful for dynamic keys or special characters):

// javascript
// Copy code
// console.log(person["age"]); // Output: 25

// const key = "profession";
// console.log(person[key]); // Output: Developer
// Adding, Modifying, and Deleting Properties
// Add or Modify a Property
// javascript
// Copy code
// person.location = "India"; // Adding a new property
// person.age = 26; // Modifying an existing property

// console.log(person);
// Delete a Property
// javascript
// Copy code
// delete person.profession;
// console.log(person);
// Methods in Objects
// When a function is assigned as a property of an object, it is called a method.

// javascript
// Copy code
// const person = {
//   name: "Krutik",
//   greet: function () {
//     console.log(`Hello, my name is ${this.name}`);
//   },
// };

// person.greet(); // Output: Hello, my name is Krutik
// this refers to the object calling the method.
// Iterating Over Objects
// for...in Loop: Iterates over the keys of an object.

// javascript
// Copy code
// for (let key in person) {
//   console.log(key, person[key]);
// }
// Object.keys(): Returns an array of the object's keys.

// javascript
// Copy code
// console.log(Object.keys(person)); // ['name', 'greet']
// Object.values(): Returns an array of the object's values.

// javascript
// Copy code
// console.log(Object.values(person)); // ['Krutik', ƒ greet()]
// Object.entries(): Returns an array of key-value pairs.

// javascript
// Copy code
// console.log(Object.entries(person)); // [['name', 'Krutik'], ['greet', ƒ]]
// Nested Objects
// Objects can contain other objects.

// javascript
// Copy code
// const student = {
//   name: "John",
//   subjects: {
//     math: 90,
//     science: 85,
//   },
// };

// console.log(student.subjects.math); // Output: 90
// Object Methods
// Object.assign(): Copies properties from one object to another.

// javascript
// Copy code
// const target = { a: 1 };
// const source = { b: 2 };

// Object.assign(target, source);
// console.log(target); // { a: 1, b: 2 }
// Object.freeze(): Prevents modification of properties.

// javascript
// Copy code
// const obj = { a: 1 };
// Object.freeze(obj);

// obj.a = 2; // No effect
// console.log(obj.a); // Output: 1
// Object.seal(): Allows modification of existing properties but prevents adding or deleting properties.

// javascript
// Copy code
// const obj = { a: 1 };
// Object.seal(obj);

// obj.a = 2; // Allowed
// obj.b = 3; // Not allowed
// delete obj.a; // Not allowed
// console.log(obj); // { a: 2 }
// Special Objects
// 1. this Context
// The this keyword refers to the object it is used within.

// javascript
// Copy code
// const person = {
//   name: "Krutik",
//   greet() {
//     console.log(this.name);
//   },
// };

// person.greet(); // Output: Krutik
// 2. Constructor Function (to create multiple similar objects)
// javascript
// Copy code
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// const john = new Person("John", 30);
// console.log(john.name); // Output: John
// Summary
// Objects are collections of key-value pairs.
// Properties can be accessed using dot notation or bracket notation.
// Functions inside objects are called methods.
// Use for...in or Object.keys/values/entries to iterate through objects.
// Objects can be nested, and they support methods like assign, freeze, and seal.

