//IIFE - Immediately Invoked Function Expression
(function () {
  console.log("This is an IIFE");
})();
// The above code defines an IIFE that executes immediately after its definition.
// It logs "This is an IIFE" to the console. The IIFE is self-contained and does not have any external dependencies. It is often used to encapsulate code and prevent global namespace pollution.

// what is preventing global namespace pollution?
// In the context of JavaScript, global namespace pollution refers to the situation where variables and functions defined in the global scope can conflict with each other, leading to unintended behavior or errors. IIFEs help prevent this by creating a new scope, allowing you to define variables and functions that are not accessible outside of the IIFE.  
// Example of preventing global namespace pollution with IIFE:  

(function () {
  var localVariable = "I am local";
  function localFunction() {
    console.log("This is a local function");
  }
  
  localFunction(); // Output: This is a local function
})();
// console.log(localVariable); // Uncaught ReferenceError: localVariable is not defined
// The localVariable and localFunction are defined within the IIFE, so they are not accessible outside of the IIFE. This prevents global namespace pollution and makes the code more modular and easier to maintain.

// Example of using IIFE to create a module pattern
const myModule = (function () {
  let privateVariable = "I am private";
  function privateFunction() {
    console.log("This is a private function");
  } 
  return {
    publicMethod: function () {
      console.log("This is a public method");
      privateFunction(); // Accessing the private function
    },
    getPrivateVariable: function () {
      return privateVariable; // Accessing the private variable
    }
  };    
})();
myModule.publicMethod(); // Output: This is a public method
// console.log(myModule.privateVariable); // Uncaught ReferenceError: privateVariable is not defined
console.log(myModule.getPrivateVariable()); // Output: I am private
// The module pattern allows you to encapsulate code and hide implementation details from the outside world. It provides a clean and organized way to structure code and make it easier to maintain and reuse. The IIFE is used to create a new scope, allowing you to define variables and functions that are not accessible outside of the IIFE. This prevents global namespace pollution and makes the code more modular and easier to maintain.
// Example of using IIFE to create a counter
const counter = (function () {
    let count = 0; // Private variable
    return {
        increment: function () {
        count++;
        console.log(`Count: ${count}`);
        },
        decrement: function () {
        count--;
        console.log(`Count: ${count}`);
        },
        getCount: function () {
        return count; // Accessing the private variable
        }
    };
    })();
counter.increment(); // Output: Count: 1
counter.increment(); // Output: Count: 2
counter.decrement(); // Output: Count: 1
console.log(counter.getCount()); // Output: 1
// The counter example demonstrates how IIFEs can be used to create private variables and methods, allowing you to encapsulate functionality and prevent external access to internal state. This is a common pattern in JavaScript for creating modules and managing state in a controlled manner.
// The counter object has methods to increment, decrement, and get the current count, while the `count` variable remains private and cannot be accessed directly from outside the IIFE. This encapsulation helps maintain a clean global namespace and prevents unintended interference with the internal state of the counter. 

