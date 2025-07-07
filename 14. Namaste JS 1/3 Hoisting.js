/*
Hoisting is a behavior in JavaScript where variable and function declarations are moved to the top of their containing scope (script or function) during the compilation phase, before code execution.

This doesn't mean the actual code is physically moved, but JavaScript acts as if the declarations are at the top of their scope.

🔹 How Hoisting Works
✅ Function Declarations
Function declarations are fully hoisted, meaning the entire function is available before it's defined.


sayHello(); // ✅ Works because it's hoisted

function sayHello() {
  console.log("Hello!");
}
❌ Function Expressions
Function expressions (especially with const or let) are not hoisted the same way. The variable name is hoisted, but the function definition is not assigned until runtime.


sayHi(); // ❌ TypeError: sayHi is not a function

const sayHi = function () {
  console.log("Hi!");
};
🟡 Variable Declarations
var declarations are hoisted but initialized as undefined.


console.log(x); // undefined, not ReferenceError
var x = 5;
let and const are hoisted too, but not initialized. They exist in a "temporal dead zone" (TDZ) from the start of the block until the declaration is encountered.


console.log(y); // ❌ ReferenceError
let y = 10;
🔍 Summary Table
Type	Hoisted?	Initialized?	Usable before definition?
var	✅ Yes	✅ As undefined	✅ Yes (but undefined)
let / const	✅ Yes	❌ No (TDZ)	❌ No
Function Decl.	✅ Yes	✅ Fully	✅ Yes
Function Expr.	✅ (var)	❌	❌ No

🧠 Why It Matters
Hoisting can lead to confusing bugs if you're not aware of it—especially with var and function expressions. Always declare variables at the top of their scope and prefer let/const to avoid issues.

Let’s go step-by-step with a visual and memory-based explanation of how hoisting works in JavaScript.

🔁 JavaScript Execution Phases
JavaScript runs in two phases:

Compilation Phase (aka “Creation Phase”)

Execution Phase

During the compilation phase, the JS engine:

Allocates memory for variables and functions

Hoists declarations

Sets up scope

📦 Example Code

console.log(a);
greet();

var a = 10;

function greet() {
  console.log("Hello!");
}
🔬 How JS Engine Handles This
💡 Compilation Phase (Before execution)
var a is hoisted and memory is reserved — set to undefined

function greet() is hoisted with its full definition

The memory model now looks like this:

javascript
Copy
Edit
Memory:
a      → undefined
greet  → function() { console.log("Hello!"); }
🚀 Execution Phase
Line-by-line execution:


console.log(a); // ✅ a is declared, value is `undefined`

greet();        // ✅ Function is fully hoisted
Output: Hello!

var a = 10;     // a is now assigned 10

📉 If Using let or const

console.log(b); // ❌ ReferenceError
let b = 20;
In the compilation phase, b is hoisted, but not initialized. It's in a Temporal Dead Zone (TDZ) until the line where it’s declared.

📊 Visual Diagram
| Line | Action during execution           | Memory                  |
|------|-----------------------------------|--------------------------|
| 1    | console.log(a)                    | a: undefined             |
| 2    | greet()                           | greet: function(){...}   |
| 4    | a = 10                            | a: 10                    |

🔐 Key Takeaways
Only declarations are hoisted, not initializations.

var is initialized to undefined, let and const are not.

Function declarations are hoisted with full body.

Function expressions follow variable hoisting rules.
*/ 