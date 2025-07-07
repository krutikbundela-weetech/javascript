/**
 * ? let and const declarations are hoisted to the top of their block scope, but they are not initialized.
 *  This means that they cannot be accessed before their declaration, leading to a "Temporal DeadZone" (TDZ).
 *  The TDZ is the time between the start of the block and the point where the variable is declared.
 * console.log(x); // ReferenceError: Cannot access 'x' before initialization
 * !between log and declaration, the variable is in the TDZ.
 * let x = 10;
 *  Accessing a variable in the TDZ will result in a ReferenceError.   
 * * ? This behavior is different from var, which is hoisted and initialized to undefined.
 * The TDZ helps prevent bugs by ensuring that variables are not accessed before they are declared.
 * 
 * let a = 10;
 * console.log(a); // 10
 * console.log(window.a) // undefined
 * ! The variable 'a' is not added to the global object (window) when declared with let or const.
 * ! This is because let and const are block-scoped, while var is function-scoped or globally scoped.
 * ! This means that let and const variables are not accessible outside their block scope, unlike var.
 * 
 * 
 */
//  if they are not in global space, then how could they have access to variables which are inside global space???
var x =34;
let y = x;
console.log(y); // Output: 34

//? let and const are stored in a separate memory space called the Script Record Environment.
// The global object (like window in browsers) and the Script Record Environment are connect through the lexical environment. Variables declared with let and const are not directly accessible as properties of the global object. Instead, they are accessed through the scope chain (Lexical Environment)
// Why can't let and const be accessed directly?
// They are scoped and protected inside the Script Record Environment to prevent accidental modifications and improve security. This behavior helps maintain block-level scoping and avoids issues caused by global pollution.