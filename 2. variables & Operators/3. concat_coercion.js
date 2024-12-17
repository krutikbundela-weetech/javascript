//* ============================
//* Data Types Section - part 2
//* ============================

//* Concatenation in JavaScript
//? In JavaScript, the + sign is not only used for arithmetic addition but also for string concatenation. When the + operator is used with strings, it concatenates the strings together.
//? It's important to note that if any operand of the + operator is a string, JavaScript will treat the other operands as strings as well, resulting in string concatenation. If both operands are numbers, the + operator performs numeric addition.

// const str = "Hello " + "World";
// console.log(str);

//* Type coercion is the automatic conversion of "values" from one data type to another.
//? It is a fundamental part of JavaScript and can be used to make code more readable and efficient.
//? There are two types of coercion in JavaScript: implicit and explicit. Implicit coercion happens automatically, while explicit coercion is done manually by the programmer.
//! It's worth noting that type coercion can lead to unexpected results, so it's essential to be aware of how JavaScript handles these situations.

let sum = "5" - 10;
console.log(sum);
// let sum2 = "5" + 10;
// console.log(sum2);

//* ============================
//* Tricky Interview Questions
//* ============================
// console.log(10 + "20");
// console.log(9 - "5");
// console.log("Java" + "Script");
// console.log(" " + " ");
// let sum = " " + 0;
// console.log(typeof sum);
// console.log("vinod" - "thapa");
// console.log(true + true); // 1 + 1
// console.log(true + false); // 1 + 0
// console.log(false + true); // 0 + 1
// console.log(false - true); // 0 - 1


/**
 * Coercion vs Conversion
It's important to understand that JavaScript is able to use variables in conditions - even without comparison operators.

This is kind of obvious, if we consider a boolean variable, for example:

let isLoggedIn = true;
if (isLoggedIn) {
    ...
}
Since if just wants a condition that returns true or false, it makes sense that you can just provide a boolean variable or value and it works - without the extra comparison (if (isLoggedIn === true) - that would also work but is redundant).

Whilst the above example makes sense, it can be confusing when you encounter code like this for the first time:

let userInput = 'Max';
if (userInput) {
    ... // this code here will execute because 'Max' is "truthy" (all strings but empty strings are)
}
JavaScript tries to coerce ("convert without really converting") the values you pass to if (or other places where conditions are required) to boolean values. That means that it tries to interpret 'Max' as a boolean - and there it follows the rules outlined in the previous lecture (e.g. 0 is treated as false, all other numbers are treated as true etc.)

It's important to understand that JavaScript doesn't really convert the value though.

userInput still holds 'Max' after being used in a condition like shown above - it's not converted to a boolean. That would be horrible because you'd invisibly lose the values stored in your variables.

Instead,

if (userInput) { ... }
is basically transformed (behind the scenes) to

if (userInput === true) {
And here, the === operator generates and returns a boolean. It also doesn't touch the variable you're comparing - userInput stays a string. But it generates a new boolean which is temporarily used in the comparison.

And that's exactly what JavaScript automatically does when it finds something like this:

if (userInput) { ... }
 */



/**
 * Mixing Numbers & Strings
You saw the example with a number and a "text number" being added

3 + '3' => '33'

in JavaScript.

That happens because the + operator also supports strings (for string concatenation).

It's the only arithmetic operator that supports strings though. For example, this will not work:

'hi' - 'i' => NaN

NaN is covered a little later, the core takeaway is that you can't generate a string of 'h' with the above code. Only + supports both strings and numbers.

Thankfully, JavaScript is pretty smart and therefore is actually able to handle this code:

3 * '3' => 9

Please note: It yields the number (!) 9, NOT a string '9'!

Similarly, these operations also all work:

3 - '3' => 0

3 / '3' => 1

Just 3 + '3' yields '33' because here JavaScript uses the "I can combine text" mode of the + operator and generates a string instead of a number.
 */