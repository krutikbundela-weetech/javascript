/**
 * ? Lexical Environment and Scope Chain
 * * Lexical Environment is a structure that holds variable bindings and provides the scope chain for variable resolution.
 *  * * It consists of two main components:
 *  * * 1. Environment Record: Contains the actual variable bindings (key-value pairs).
 *  * * 2. Outer Lexical Environment Reference: Points to the outer lexical environment
 * * * (the parent scope).
 * * Scope Chain is the mechanism that allows JavaScript to resolve variable references.
 * * * When a variable is accessed, the JavaScript engine looks for it in the current lexical environment first.
 * * * If not found, it traverses the outer lexical environments until it finds the variable or reaches the global scope.
 * * * This chain of environments is called the scope chain.
 *
 */

function a() {
  var b = 10;
  c();
  function c() {}
}
a();
console.log(b);
/**
 * !Lexical Environment: so whenever an Execution Context is created, it will create a Lexical Environment.
 * ? A Lexical is the local memory along with the reference to the outer lexical environment.
 */

/**
 * ? Example Explanation:
 * It will first creates a global execution context and it is pushed in call stack. it will have a lexical environment with null as outer lexical environment reference.
 * 
 * then it will create a new execution context for function a() and it is pushed in call stack. it will have a lexical environment with global lexical environment as outer lexical environment reference.
 * 
 * then it will create a new execution context for function c() and it is pushed in call stack. it will have a lexical environment with function a() lexical environment as outer lexical environment reference.
 * 

 * 
 */
