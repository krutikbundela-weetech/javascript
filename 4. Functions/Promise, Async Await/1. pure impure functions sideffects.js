// Understanding pure functions, impure functions, and side effects is crucial for writing clean, predictable, and maintainable code in programming.

// 1. Pure Functions
// Definition:
// A pure function is a function that:

// Always returns the same output for the same input.
// Does not produce any side effects (i.e., it doesn’t modify anything outside of its scope).
// Characteristics:
// Deterministic: The output depends only on the input.
// No dependency on or modification of external state.
// Easy to test and reason about.
// Examples of Pure Functions
// javascript
// Copy code
// // Pure Function Example
// function add(a, b) {
//   return a + b; // Always produces the same output for the same inputs
// }

// // Example Usage
// console.log(add(2, 3)); // Outputs: 5
// console.log(add(2, 3)); // Outputs: 5 (same inputs, same output)
// javascript
// Copy code
// // Another Pure Function Example
// function multiplyByFactor(number, factor) {
//   return number * factor; // Depends only on inputs
// }

// console.log(multiplyByFactor(4, 2)); // Outputs: 8
// console.log(multiplyByFactor(4, 2)); // Outputs: 8
// 2. Impure Functions
// Definition:
// An impure function is a function that:

// May produce different outputs for the same input (non-deterministic).
// Causes or relies on side effects (e.g., modifying a global variable, interacting with external systems).
// Characteristics:
// Relies on or alters external state.
// May produce side effects like logging, updating a database, or modifying variables outside its scope.
// Harder to test and debug.
// Examples of Impure Functions
// javascript
// Copy code
// // Impure Function Example: Relies on external state
// let count = 0;

// function increment() {
//   count++; // Modifies the external variable
//   return count;
// }

// // Example Usage
// console.log(increment()); // Outputs: 1 (depends on `count`'s value)
// console.log(increment()); // Outputs: 2 (different result for same function call)
// javascript
// Copy code
// // Another Impure Function Example: Side effects (logging)
// function logMessage(message) {
//   console.log(message); // Produces a side effect (console output)
// }

// logMessage("Hello, World!"); // Produces a visible side effect
// 3. Side Effects
// Definition:
// A side effect occurs when a function interacts with or modifies something outside its own scope. This includes:

// Modifying global variables.
// Altering input parameters.
// Logging to the console.
// Making API calls.
// Updating the DOM.
// Writing to a file or database.
// Examples of Side Effects
// 1. Modifying a Global Variable:
// javascript
// Copy code
// let value = 10;

// function impureAdd(x) {
//   value += x; // Modifies a global variable (side effect)
//   return value;
// }

// console.log(impureAdd(5)); // Outputs: 15
// console.log(value);        // Outputs: 15 (external state modified)
// 2. DOM Manipulation:
// javascript
// Copy code
// function updateHeading() {
//   document.getElementById('heading').innerText = "Updated!"; // Updates DOM (side effect)
// }

// updateHeading(); // Alters the state of the DOM
// 3. API Calls:
// javascript
// Copy code
// function fetchData(url) {
//   fetch(url) // Makes a network request (side effect)
//     .then(response => response.json())
//     .then(data => console.log(data));
// }

// fetchData('https://api.example.com/data');
// Comparison: Pure vs. Impure Functions
// Aspect	Pure Functions	Impure Functions
// Output	Always the same for the same input	May vary for the same input
// External State	Does not rely on or modify external state	Relies on or modifies external state
// Side Effects	No side effects	May produce side effects
// Testability	Easy to test	Harder to test
// Benefits of Pure Functions
// Predictability: Easier to reason about since the output depends only on the input.
// Testability: Simple to test because they don’t depend on external state.
// Reusability: More reusable since they don’t depend on the environment.
// Concurrency: Safer to use in concurrent applications (e.g., multi-threading).
// Real-World Example: Pure vs. Impure
// Scenario: Adding Tax to a Price
// Pure Function:
// javascript
// Copy code
// function calculateTotal(price, taxRate) {
//   return price + price * taxRate; // Depends only on inputs
// }

// console.log(calculateTotal(100, 0.1)); // Outputs: 110
// console.log(calculateTotal(100, 0.1)); // Always outputs: 110
// Impure Function:
// javascript
// Copy code
// let taxRate = 0.1;

// function calculateTotalImpure(price) {
//   return price + price * taxRate; // Depends on external `taxRate`
// }

// taxRate = 0.2;
// console.log(calculateTotalImpure(100)); // Outputs: 120 (different result)
// When to Use Each?
// Pure Functions:

// Ideal for functional programming and business logic.
// Use when you need predictability and reusability.
// Impure Functions:

// Necessary when interacting with the outside world (e.g., making API calls, updating UI).
// Use cautiously to minimize unexpected behaviors.
// If you’d like further clarification or examples, let me know! 😊