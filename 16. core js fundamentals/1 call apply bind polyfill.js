//! call method(function borrowing)

// The call method allows you to call a function with a specific this value.
// It takes the this value as the first argument and the rest of the arguments are passed to the function as normal arguments.
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}
const person1 = {
  firstName: "Akshay",
  lastName: "Kumar",
};
greet.call(person1, "Hello"); // Hello, John

let printFullName = function (homeTown, state) {
  console.log(`${this.firstName} ${this.lastName} from ${homeTown}, ${state}`);
};

printFullName.call(person1, "New York", "NY"); // Akshay Kumar from New York, NY


//? without call method

function setUsername(username) {
  this.username = username;
}

function createUser(username,email,password) {
  // setUsername(username);  // this refers to the global object (or undefined in strict mode), not the createUser instance
  setUsername.call(this, username); // Fix: bind `this`
  this.email = email;
  this.password = password;
}

const user1 =  new createUser("john_doe", "john_doe@example.com", "password123");
console.log(user1); 

// In your createUser function, you're calling setUsername(username), but without binding this properly, so inside setUsername, this refers to the global object (or undefined in strict mode), not the createUser instance.

// As a result, this.username is not set on the instance, and user1 only gets email and password properties.

//so to solve this, setUsername.call(this, username); // Fix: bind `this`


//! apply method(function borrowing with array of arguments)

printFullName.apply(person1, ["New York", "NY"]); // Akshay Kumar from New York, NY

//! bind method(function borrowing with a new function)
// The bind method creates a new function with a specific this value.
// It takes the this value as the first argument and the rest of the arguments are passed to the function as normal arguments.
let boundFullName = printFullName.bind(person1, "New York", "NY");
console.log(boundFullName); // [Function: boundFullName]
// The bound function can be called later with the same this value and arguments.

boundFullName(); // Akshay Kumar from New York, NY

//! Polyfill for call, apply, and bind methods
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis; // Use globalThis for the global object
  context.fn = this; // Assign the function to a property of the context
  const result = context.fn(...args); // Call the function with the context and arguments
  delete context.fn; // Clean up the property
  return result; // Return the result
};
Function.prototype.myApply = function (context, args) {
  context = context || globalThis; // Use globalThis for the global object
  context.fn = this; // Assign the function to a property of the context
  const result = context.fn(...args); // Call the function with the context and arguments
  delete context.fn; // Clean up the property
  return result; // Return the result
};
Function.prototype.myBind = function (context, ...args) {
  context = context || globalThis; // Use globalThis for the global object
  const fn = this; // Assign the function to a variable
  return function (...bindArgs) {
    return fn.apply(context, [...args, ...bindArgs]); // Call the function with the context and arguments
  };
};

// Example usage of the polyfill
const person2 = {
  firstName: "Deepika",
  lastName: "Kumar",
};
greet.myCall(person2, "Hi"); // Hi, Deepika
let boundGreet = greet.myBind(person2, "Hello");
console.log(boundGreet); // [Function: boundGreet]
boundGreet(); // Hello, Deepika

// Example usage of the polyfill for apply
printFullName.myApply(person2, ["Los Angeles", "CA"]); // Deepika Kumar from Los Angeles, CA

// Example usage of the polyfill for bind
let boundPrintFullName = printFullName.myBind(person2, "Los Angeles", "CA");
console.log(boundPrintFullName); // [Function: boundPrintFullName]
boundPrintFullName(); // Deepika Kumar from Los Angeles, CA
