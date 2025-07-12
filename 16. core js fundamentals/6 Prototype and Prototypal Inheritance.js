// Everything is an object in JavaScript, and objects can inherit properties and methods from other objects.

// what is prototype?
// Every function in JavaScript has a prototype property, which is an object that is used to provide default properties and methods for objects created by that function.
// When you create an object using a constructor function, that object inherits properties and methods from the constructor's prototype.
// The prototype is a fundamental part of JavaScript's prototypal inheritance system, allowing objects to share properties and methods without duplicating them.
// The prototype chain is the mechanism by which JavaScript objects inherit features from one another.
// The prototype chain is a series of links between objects, where each object has a reference to its prototype.
// When you access a property or method on an object, JavaScript first checks if that property exists on the object itself. If it doesn't, it looks up the prototype chain until it finds the property or reaches the end of the chain (null).
// Example of prototype:
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};
const john = new Person("John");
john.greet(); // Output: Hello, my name is John

// Example of prototype chain:
const animal = {
  species: "Animal",
  makeSound: function () {
    console.log("Some generic animal sound");
  },
};

const dog = Object.create(animal); // dog inherits from animal
dog.breed = "Labrador";
dog.makeSound(); // Output: Some generic animal sound
dog.bark = function () {
  console.log("Woof! Woof!");
};
dog.bark(); // Output: Woof! Woof!
console.log(dog.species); // Output: Animal
console.log(dog.breed); // Output: Labrador

// Example of prototype inheritance:
function Animal(name) {
  this.name = name;
}
Animal.prototype.makeSound = function () {
  console.log(`${this.name} makes a sound`);
};
function Dog(name) {
  Animal.call(this, name); // Call the parent constructor
}
Dog.prototype = Object.create(Animal.prototype); // Set up inheritance
Dog.prototype.constructor = Dog; // Correct the constructor reference
const myDog = new Dog("Buddy");
myDog.makeSound(); // Output: Buddy makes a sound

// ===================================================

//! 6.4 functions are functions and objects in JavaScript

function multiplyBy5(num) {
  return num * 5;
}
multiplyBy5.power = 5; // Adding a custom property to the function
console.log(multiplyBy5(10)); // Output: 50
console.log(multiplyBy5.power); // Output: 5
console.log(multiplyBy5.prototype); // Output: {} (an empty object, as functions do not have a prototype by default)

//! this === jis (ne bhi bulaaya hai)

function createUser(username, price) {
  this.username = username;
  this.price = price;
}

createUser.prototype.getDetails = function () {
  return `Username: ${this.username}, Price: ${this.price}`;
};
console.log(createUser.prototype); // Output: { getDetails: [Function: getDetails] }

const user1 = new createUser("JohnDoe", 100);
const user2 = new createUser("JaneDoe", 200);

// Accessing the prototype method from the prototype
// of the constructor function
//new keyword creates a new object and sets its prototype to the constructor's prototype
// The 'this' keyword inside the method refers to the instance created by the constructor function.
//in short: 'new' keyword creates a new object and sets its prototype to the constructor's prototype
//here the constructor function is createUser and the prototype method is getDetails
// So, when we call user1.getDetails(), 'this' refers to user1, and the method getDetails() is called on user1.

console.log(user1.getDetails()); // Output: Username: JohnDoe, Price: 100
console.log(user2.getDetails()); // Output: Username: JaneDoe, Price: 200

/**

Here's what happens behind the scenes when the new keyword
is used:

 A new object is created: The new keyword initiates the
creation of a new JavaScript object.

A prototype is linked: The newly created object gets linked
to the prototype property of the constructor function. This
means that it has access to properties and methods defined
on the constructor's prototype.

The constructor is called: The constructor function is
called with the specified arguments and this is bound to
the newly created object. If no explicit return value is
specified from the constructor, JavaScript assumes this,
the newly created object, to be the intended return value.

The new object is returned: After the constructor function
has been called, if it doesn't return a non-primitive value
(object, array, function, etc.), the newly created object
is returned.

 */


// creating prototype

Object.prototype.customMethod = function () {
  console.log("This is a custom method on the Object prototype");
}

const obj1 = {};
obj1.customMethod(); // Output: This is a custom method on the Object prototype

const str = "Hello";
str.customMethod(); // Output: This is a custom method on the Object prototype (strings are also objects in JavaScript)

// String, Number, and Boolean are all objects in JavaScript, and they inherit from their respective prototypes and also from Object prototype 
// because they are instances of Object constructor function.
String.prototype.customStringMethod = function () {
  console.log(`Custom string method called on: ${this}`);
};

str.customStringMethod(); // Output: Custom string method called on: Hello

// But String custom methods are not available on objects directly, as they are specific to string instances.

obj1.customStringMethod(); // Output: TypeError: obj1.customStringMethod is not a function


//Inheritance

const Teacher = {
    makeVideo:true
}

const TeachingSupport = {
    isAvailable: true,
}

const TASupport = {
    makeAssignment: 'JS assignments',
    fullTime: true,
    __proto__: TeachingSupport // Setting the prototype of TASupport to TeachingSupport
}

const User = {
    name: 'John Doe',
    age: 30,
    __proto__: Teacher // Setting the prototype of User to Teacher
}

Teacher.__proto__ = User; // Setting the prototype of Teacher to User

//above is old approach, now we use Object.create() to create objects with a specific prototype
const NewTeacher = Object.create(User); // Creating a new object with User as its prototype
NewTeacher.name = 'Jane Smith'; // Adding a property to the new object 
console.log(NewTeacher.name); // Output: Jane Smith
console.log(NewTeacher.age); // Output: 30 (inherited from User)

Object.setPrototypeOf(TASupport, TeachingSupport); // Setting the prototype of TASupport to TeachingSupport
console.log(TASupport.isAvailable); // Output: true (inherited from TeachingSupport)
console.log(TASupport.makeAssignment); // Output: JS assignments (inherited from TeachingSupport)
console.log(TASupport.fullTime); // Output: true (inherited from TeachingSupport)   

