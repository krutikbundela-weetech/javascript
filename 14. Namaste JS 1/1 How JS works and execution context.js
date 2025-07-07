/**
 * ! How JS works and execution context.
 * * Everything in JS happens inside an execution context.
 * * Execution context is an environment where the JS code is executed.
 * * * There are two types of execution context:
 * * * 1. Global Execution Context
 * * * 2. Function Execution Context
 *  * * Global Execution Context is created when the JS engine starts executing the code.
 * * * It creates a global object (in browsers, it's `window`) and a special
 * * object called `this`.
 * * * Function Execution Context is created when a function is called.
 * * * It creates a new execution context for that function call, which includes
 * * the function's arguments, local variables, and the value of `this` inside that function.
 * * * The execution context has a stack, which is a data structure that keeps track of the execution contexts.
 * * * When a function is called, a new execution context is created and pushed onto the stack.
 * * * When the function execution is completed, the execution context is popped off the stack.
 * * * The execution context also has a scope chain, which is a chain of objects that
 * * contains the variables and functions that are accessible in that context.
 * 
 * ?EXECUTION CONTEXT
 * *1. Memory(Variable environment): key-value pairs of variables and functions. (a:10 , fn: function() {})
 * 
 * *2. Code(Thread of Execution): the code that is executed in that context. 1 line at a time
 * 
 * 
 * ? JS is a synchronous single-threaded language.
 * 
 * at Global Execution context level window is the global object and this is the global object.
 * 
 * window === this is always true in the global execution context.
 * 
 * 
 * 
 */

var a = 10;

console.log(window.a); // 10
console.log(a); // 10
console.log(this.a); // 10
