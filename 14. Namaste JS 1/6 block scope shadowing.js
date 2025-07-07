/**
 * What is Block ?
Block is defined by curly braces i.e { .. }
Block is also know as Compound Statement.
Why Block is required in JS?
Block is used to combine multiple javascript statements into one group.

Why we need to group multiple statements at one place?
we group multiple statements in a block so that we can use it where JS expects one statement

Example: if statement only expecting one statement but we provided multiple statements using curly braces. This is a Block.

if(true){
// Compound Statement
var a = 10;
console.log(a);
}
— — — — — — — — — — — — — — — — — — — — — — —
What is Block Scoped?
Block Scoped means what all variables and functions we can access inside block.

To understand in details, let’s take an example and run it:

{
var a = 10;
let b = 20;
const c = 30;
}

So, “b” and “c” are inside Block Scope which is separate space which is reserved for block only. But “a” is hoisted inside global object.
From here the statement comes in picture that:

*!let and const are block scoped.

Therefore, you can’t access let and const type variable outside the scope .

In 6.1 screenshot, you can see three scopes ::::

Global: memory reserved for var
Script: separate memory for let and const outside block scope
Block: separate memory for variables inside scope
 */