//* ============================
//* Data Types Section
//* ============================

//* Data types define the type of values that a variable can hold.

//? Types of Primitive Data types

//? Number: Represents numeric values, including integers and floating-point numbers.
// Example:
// var myFavNum = -5;
// var myFavNum2 = 48.678;
// console.log("myFavNum2:", myFavNum2);
// console.log(myFavNum);

// Number.MAX_SAFE_INTEGER  
// Math.pow(2,53)
// Number.MIN_SAFE_INTEGER  
// Number.MAX_VALUE

//? String: Represents a sequence of characters enclosed in single or double quotes.
// Example:
// var myName = 'krutik';
// var myName2 = "arbaz";
// console.log(myName);

//? Boolean: Represents a logical entity with two values: true or false.
// Example:
// var isRaining = false;
// isRaining = "vgvhgvh";
// var areYouAwesome = true;
// console.log("areYouAwesome:", areYouAwesome);
// console.log(isRaining);

//? undefined: Represents the absence of a value or an uninitialized variable.
// Example:
// var krutik; //Declaration
// console.log(" before krutik:", krutik);

// krutik = "gvvudcwe"; // initialization
// console.log(" after krutik:", krutik);

// var arbaz = "hubuybuy"; // Declaration & initialization at same time

// console.log(krutik);

//? Null: Represents the absence of a value. It is often used to explicitly indicate that a variable or object property has no assigned value.
// Example:
// var badMemories = null;
// console.log(badMemories);

// badMemories = "uygyyuguygfu";

//? BigInt: Represents integers of arbitrary precision (available since ECMAScript 2020).
// Example:
// const bigNumber = 1234567890123456789012345678901234567890n;
// console.log("bigNumber:", bigNumber);
//paachad n lakhi daiyee etle BigInt thai jaai
//decimal point nai mukii sakaai

// parseInt(10n) - 4 //6n
// 10n - BigInt(4)

// 10n* 3n // 30n

// 5n/2n // 2n (no decimal)


//? Symbol: Represents a unique and immutable data type, often used to create unique identifiers.
// Example:
// const mySymbol = Symbol("ihgibguygbb");
// console.log("mySymbol:", mySymbol);

//! ============================
//! Data Types Interview Questions
//! ============================

//? 1: What is the difference between null and undefined in JavaScript❓

// null: Imagine an Empty Box
// //* Explanation: Think of a variable as a box. When we say a box has null inside, it's like having an empty box. The box exists, but there's nothing valuable or meaningful inside it.

// //? Example: You have a toy box, but if it's null, it means there are no toys inside. It's not that the box is broken; it just doesn't have anything interesting in it right now.

// undefined: Imagine a Box That Wasn't Opened Yet
//* Explanation: Now, if we talk about undefined, it's like having a box that you haven't opened yet. You know the box is there, but you haven't put anything inside or looked to see what's in it.

//? Example: You have a gift box, and until you open it, you don't know what's inside. Right now, it's undefined because you haven't checked or filled it with anything yet.

// Putting It Together
// Summary: So, null is like having an empty box on purpose, and undefined is like having a box you haven't opened yet. Both tell us that there's nothing meaningful or known inside, but they imply different reasons why.

//todo Real-life Comparison: If you have an empty lunchbox (null), it means you decided not to put any food in it. If you have a closed lunchbox (undefined), it means you haven't checked or filled it yet.

//? 2: What is the purpose of typeof operator in JavaScript❓

// var myName = "100";
// console.log("value of var:",myName);
// console.log("datatype of var:  ",typeof myName);

// var name1 = "sneha"
// console.log("name:", name1);
// console.log(" data type  of name:", typeof name1);


//? 3: What is the result of `typeof null` in JavaScript❓
// var badMemories = null;
// console.log(badMemories);
// console.log(typeof badMemories);

//? 4: What are primitive data types in JavaScript❓

//? 5: Convert a string to a number?
// We just need to add the '+' sign before the string
// Example:
// var myFavNum = "10";
// console.log(myFavNum);
// console.log(+myFavNum);
// console.log(typeof +myFavNum);
// console.log(typeof Number(myFavNum));
// console.log( Number(myFavNum));
// console.log(myFavNum);


// myFavNum = Number(myFavNum)


// console.log(myFavNum);
// console.log("myFavNum:", typeof myFavNum);

//? 6: Convert a number to a string?
// We just need to add an empty string after the number
// Example:

// var str = 5 + " 10" ;
// console.log(str);
// console.log(typeof str);

//? 7: Explain the concept of truthy and falsy values in JavaScript. Provide examples.❓
//* In JavaScript, values are either considered "truthy" or "falsy" when evaluated in a boolean context.

//? Truthy values are treated as true when used in conditions. Examples include:
// 👉 true
// 👉 Any non-empty string ("hello")
// 👉 Any non-zero number (42)
// 👉 Arrays and objects, even if they're not empty

// Falsy values are treated as false in boolean contexts. Examples include:
// 👉 false
// 👉 0 (zero)
// 👉 '' (an empty string)
// 👉 null
// 👉 undefined
// 👉 NaN (Not a Number)

//? 8: To check if a non-empty string is truthy or falsy in JavaScript, we can directly use if statement.

// var myName = null;
// if (myName) {
//   console.log("this is truthy value");
// } else {
//   console.log("its a falsy value");
// }

//* ==========  Data Types End Section ==========

//todo ---------------- todo Bonus ----------------------

//* ========== parseInt & parseFloat Section ==========
//? parseInt and parseFloat are both functions in JavaScript used for converting strings to numbers, but they have different use cases.

//* parseInt: Definition: parseInt is used to parse a string and convert it to an integer (whole number).
// const myString = "8798798.65464946846";
// const myString = "hbjbhjb";
// const myString2 = false;
// const myNumber = parseInt(myString);
// const myNumber2 = parseInt(myString2);
// console.log(myNumber);
// console.log(typeof myNumber);
// console.log(myNumber2);
// console.log(typeof myNumber2);

// const myString = "42.5";
// const myNumber = parseInt(myString);
// console.log(myNumber); // Output: 42

//* parseFloat: Definition: parseFloat is used to parse a string and convert it to a floating-point number (decimal number).
const myString = 42.779798;
const myNumber = parseFloat(myString);
console.log(myNumber); 

//TODO  Key Differences:
//? parseInt is used for converting to integers and ignores anything after the decimal point.
//? parseFloat is used for converting to floating-point numbers, preserving the decimal part.
//? Both functions will attempt to convert as much of the string as possible until an invalid character is encountered.

//! Here are more examples
// console.log(parseInt("123"));
// // 123 (default base-10)
// console.log(parseInt("123", 10));
// // 123 (explicitly specify base-10)
// console.log(parseInt("   123 "));
// // 123 (whitespace is ignored)
// console.log(parseInt("077"));
// console.log(parseFloat("077"));
// // 77 (leading zeros are ignored)
// console.log(parseInt("1.9"));
// +console.log(parseFloat("1.9"));
// 1 (decimal part is truncated)

//! When we will not get an Output
// console.log(parseInt("&123"));
// console.log(parseInt("-123"));
// console.log(parseInt("xyz"));
// NaN (input can't be converted to an integer)

//? What is the purpose of the NaN value in JavaScript❓
//? NaN stands for "Not a Number" and is returned when a mathematical operation doesn't yield a valid number.
//? Also, to check whether a value is number or not we can use isNaN() function.

// console.log(isNaN("vinod"));
// console.log(parseInt("xyz"));
// console.log(parseInt("@#$"));

// //! NaN === NaN, Why is it false ❓
// if (NaN == NaN) {
//   console.log("both are equal ");
// } else {
//   console.log("not equal");
// }

//* ========== .toString() Section ==========


/**
 * In JavaScript, the .toString() method is used to convert a value to its string representation. It can be used on numbers, arrays, objects, and other data types to convert them into strings.

1. Using .toString() on Numbers
The toString() method converts a number into a string.

javascript
Copy code
const num = 42;
const str = num.toString();

console.log(str);        // "42" (string)
console.log(typeof str); // "string"
Optional: Number Bases
You can specify a radix (base) for the conversion. For example:

Base 2 for binary
Base 8 for octal
Base 16 for hexadecimal
javascript
Copy code
const num = 255;

console.log(num.toString(2));  // "11111111" (binary)
console.log(num.toString(8));  // "377" (octal)
console.log(num.toString(16)); // "ff" (hexadecimal)
2. Using .toString() on Arrays
The toString() method converts an array into a string by joining its elements with commas.

javascript
Copy code
const arr = [1, 2, 3, 4];
console.log(arr.toString()); // "1,2,3,4"
3. Using .toString() on Objects
The toString() method on objects does not produce a very useful result by default. It usually returns [object Object] unless the object overrides the method.

Example:
javascript
Copy code
const obj = { name: "Krutik", age: 25 };
console.log(obj.toString()); // "[object Object]"
If you want a more meaningful string representation of an object, you can:

Use JSON.stringify():

javascript
Copy code
console.log(JSON.stringify(obj)); // '{"name":"Krutik","age":25}'
Override the toString() method manually:

javascript
Copy code
const obj = {
  name: "Krutik",
  toString() {
    return `Name: ${this.name}`;
  },
};

console.log(obj.toString()); // "Name: Krutik"
4. Using .toString() on Strings
Calling .toString() on a string simply returns the string itself.

javascript
Copy code
const str = "Hello";
console.log(str.toString()); // "Hello"
5. Using .toString() on Booleans
The toString() method converts a boolean value to a string:

javascript
Copy code
const bool = true;
console.log(bool.toString()); // "true"
6. Behavior of .toString() on null or undefined
The toString() method cannot be called directly on null or undefined. Doing so will throw an error.

Example:
javascript
Copy code
null.toString();      // TypeError: Cannot read property 'toString' of null
undefined.toString(); // TypeError: Cannot read property 'toString' of undefined
To handle this safely, use the String() function:

javascript
Copy code
console.log(String(null));      // "null"
console.log(String(undefined)); // "undefined"
Summary
Type	Example	Output
Number	(255).toString(16)	"ff" (hexadecimal)
Array	[1,2,3].toString()	"1,2,3"
Object	{a: 1}.toString()	"[object Object]"
String	"hello".toString()	"hello"
Boolean	true.toString()	"true"
null	String(null)	"null"
Let me know if you need further clarification! 😊
*/