//! Function Statement aka Function Declaration
a(); // Calling the function
function a() {
  console.log("a called");
}
a(); // Calling the function

// //=================================================================

//!Function Expression
b(); // TypeError: b is not a function
var b = function () {
  console.log("b called");
};
b(); // Calling the function

//Difference between Function Statement and Function Expression
//?Function Statement (Declaration) is hoisted, meaning it can be called before its definition
//?Function Expression is not hoisted, so it cannot be called before its definition

// //=================================================================
//! Anonymous Function

// SyntaxError: Function statements require a name Identifier expected.ts(1003)
// function () {
//     console.log('Anonymous function called');

// }
var c = function () {
  console.log("Anonymous function called");
};
c(); // Calling the function

// //=================================================================
//! Named Function Expression
var c = function krutik() {
  console.log("Anonymous function called");
};
c(); // Calling the function
krutik(); // ?Uncaught ReferenceError: krutik is not defined
// Named function expressions can be called within themselves, but not outside of their scope.

// //=================================================================
//! Difference between Parameter and Argument

function a(value1, value2) {
  //Parameter
  console.log("a called with", value1, value2);
  console.log("a called");
}
a(10, 20); //Argument

// //=================================================================
//! First Class Function
// Functions in JavaScript are first-class citizens, meaning they can be treated like any other value.
// They can be assigned to variables, passed as arguments to other functions, and returned from functions
// Example of First Class Function
function firstClassFunction(fn) {
  console.log("First Class Function called");
  fn(); // Calling the passed function
}
firstClassFunction(function () {
  console.log("Passed function called");
});

// //=================================================================
//! Arrow Function

// //=================================================================
//! Callback Function:
// A callback function is a function that is passed as an argument to another function and is executed after some operation is completed.
// It allows you to run code after a certain task is done, making it useful for asynchronous operations or when you want to execute a function after another function has completed its task.
// Example of Callback Function
function callbackFunction() {
  console.log("Callback function called");
}
function mainFunction(callback) {
  console.log("Main function called");
  callback(); // Calling the callback function
}
mainFunction(callbackFunction);
//// ================================================
setTimeout(function () {
  console.log("Timeout function called");
}, 5000);

function x(y) {
  console.log("x called with");
  y(); // Calling the passed function
}
x(function y() {
  console.log("y called");
});

/**
 * ! JavaScript is a Synchronous and Single-threaded Language
 *? JavaScript has just one call Stack, which means it can only do one thing at a time.
 * we can also call it main thread or single thread.
 * ? So whatever executed inside the page is executed through the call stack only.
 */
/**
 * !Blocking the main thread
 * ? If you have a long-running task, it will block the main thread and prevent other
 * tasks from executing until it completes.
 * ? This can lead to a poor user experience, as the page may become unresponsive.
 * * ! To avoid blocking the main thread, you can use asynchronous programming techniques like callbacks, promises, and async/await.
 * ? This allows you to run tasks in the background without blocking the main thread, improving the responsiveness of your application.
 */
// //=================================================================

// This is an example of an event listener that calls a function when the button is clicked.
document.getElementById("clickMe").addEventListener("click", function xyz() {
  console.log("Button Clicked");
});

// ?Functions like setTimeout, addEventListener, .then(), etc. — all expect callbacks.
// ?You pass the function, they call it later when it's needed.


// //=================================================================
//! Event Listener
// An event listener is a function that waits for a specific event to occur, such as a button click, and then executes a callback function when that event happens.

function attachEventListener() {
let count = 0;
  document.getElementById("clickMe").addEventListener("click", function () {
    console.log("Button Clicked", ++count);
  });
}

attachEventListener()

// above function addEventListener() is forming closure with attachEventListener().
// This means that the inner function retains access to the variables and parameters of the outer function even after the outer function has finished executing.
// ? this is called data hiding or data encapsulation.

// ! Garbage Collection and removeEvent Listener
// If you want to remove the event listener, you need to keep a reference to the function
function handleClick() {
  console.log("Button Clicked");
}
function attachEventListenerWithReference() {
  document.getElementById("clickMe").addEventListener("click", handleClick);
}
function removeEventListenerWithReference() {
  document.getElementById("clickMe").removeEventListener("click", handleClick);
}
attachEventListenerWithReference();
// To remove the event listener, you can call the removeEventListener function with the same function reference.
// removeEventListenerWithReference();

// ! Garbage Collection
// JavaScript has a garbage collector that automatically frees up memory by removing objects that are no longer reachable.
// This helps prevent memory leaks and keeps the application running smoothly.
// However, if you have event listeners that are not removed, they can keep references to objects, preventing them from being garbage collected.
// To ensure proper memory management, it's important to remove event listeners when they are no longer needed.
// This is especially important in single-page applications (SPAs) where components may be created and destroyed frequently.
// ! Example of Garbage Collection
let obj = {  name: "Krutik",
  age: 25,    
};
function createObject() {
  let localObj = { name: "Local Object" };
  console.log("Object created:", localObj);
  return localObj; // Returning the object to keep it in scope
}
function useObject() {
  let obj = createObject();
  console.log("Using object:", obj);
  // The localObj will be garbage collected after this function finishes
}
useObject();
// After useObject() finishes, the localObj will be eligible for garbage collection since there are no references to it.
// However, if you keep a reference to it, it will not be garbage collected.
// Example of keeping a reference to an object
let persistentObj = createObject();
// The persistentObj will not be garbage collected as long as it is in scope.
// If you want to remove the reference and allow it to be garbage collected, you can set it to null
persistentObj = null;
// Now the persistentObj is eligible for garbage collection since there are no references to it.