/**
 * error handling
ChatGPT said:
ChatGPT
Error handling in JavaScript allows developers to gracefully manage runtime errors and prevent application crashes. JavaScript provides several mechanisms for error handling, including try...catch, finally, custom error throwing, and asynchronous error handling.

Error Types in JavaScript
JavaScript has built-in error types, including:

SyntaxError: Errors in syntax.

javascript
Copy code
eval("alert('Hello)") // Missing closing quote causes SyntaxError
ReferenceError: Accessing a variable that doesn't exist.

javascript
Copy code
console.log(x); // ReferenceError: x is not defined
TypeError: Invalid operation on a variable of the wrong type.

javascript
Copy code
let num = null;
num.toString(); // TypeError: Cannot read properties of null
RangeError: Value is outside the allowed range.

javascript
Copy code
let arr = new Array(-1); // RangeError: Invalid array length
EvalError: Errors related to eval() (rarely used now).

URIError: Errors in encodeURI() or decodeURI().

try...catch for Error Handling
try...catch is used to handle exceptions that occur during code execution.

Syntax
javascript
Copy code
try {
  // Code that may throw an error
} catch (error) {
  // Code to handle the error
} finally {
  // Code that will always run, regardless of errors
}
Example
javascript
Copy code
try {
  let result = riskyOperation(); // Function that may throw an error
  console.log(result);
} catch (error) {
  console.log("An error occurred:", error.message);
} finally {
  console.log("This will always execute.");
}
Output (if an error occurs):

lua
Copy code
An error occurred: riskyOperation is not defined
This will always execute.
catch Block
In the catch block, the error object provides useful information:

error.message: The error message.
error.name: The type of error (e.g., ReferenceError, TypeError).
error.stack: A stack trace showing where the error occurred.
Example:
javascript
Copy code
try {
  let x = y + 1; // ReferenceError: y is not defined
} catch (error) {
  console.log("Error Name:", error.name); // ReferenceError
  console.log("Error Message:", error.message); // y is not defined
  console.log("Error Stack:", error.stack); // Stack trace
}
Throwing Custom Errors
You can use the throw statement to create and throw custom errors.

Example
javascript
Copy code
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

try {
  let result = divide(10, 0);
  console.log(result);
} catch (error) {
  console.log("Caught an error:", error.message);
}
Output:

vbnet
Copy code
Caught an error: Division by zero is not allowed
Custom Error Classes
You can extend the built-in Error class to create custom error types.

Example
javascript
Copy code
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function checkAge(age) {
  if (age < 18) {
    throw new ValidationError("You must be 18 or older.");
  }
  return "Age is valid.";
}

try {
  console.log(checkAge(16));
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation Error:", error.message);
  } else {
    console.log("Unknown Error:", error.message);
  }
}
Output:

javascript
Copy code
Validation Error: You must be 18 or older.
finally Block
The finally block is executed after the try and catch blocks, regardless of whether an error occurred.

Example:
javascript
Copy code
try {
  console.log("Trying...");
  throw new Error("Something went wrong!");
} catch (error) {
  console.log("Error caught:", error.message);
} finally {
  console.log("Finally block always executes.");
}
Output:

vbnet
Copy code
Trying...
Error caught: Something went wrong!
Finally block always executes.
Handling Asynchronous Errors
Errors in asynchronous code (e.g., setTimeout or Promises) require special handling.

1. try...catch with async/await
javascript
Copy code
async function fetchData() {
  try {
    let response = await fetch("https://invalid-url.com");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error fetching data:", error.message);
  }
}

fetchData();
2. Handling Errors in Promises
For Promises, use .catch() to handle errors.

javascript
Copy code
fetch("https://invalid-url.com")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    console.log("Caught error:", error.message);
  });
Best Practices for Error Handling
Use try...catch for synchronous and async/await for asynchronous code.
Throw meaningful custom errors to help debugging.
Log errors for monitoring and troubleshooting.
Use finally to clean up resources (e.g., close connections).
Validate inputs before processing to prevent runtime errors.
Summary
Use try...catch to handle errors gracefully.
Use throw to create and throw custom errors.
Use finally for cleanup tasks that must always execute.
Handle asynchronous errors using async/await or .catch() in Promises.
Create custom error classes for specific error types.
 */