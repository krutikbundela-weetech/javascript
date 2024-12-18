//* ======================================
//* ARRAYS IN JAVASCRIPT
//* =====================================

//! Iterable - object where you can use the for-of loop
//! Array-like object - Any object with length property and use indexes to access items
//! Arrays as Objects:  Arrays in JavaScript are a specific type of object that has numeric keys (indices) and a length property. The indices are automatically maintained, and the length property is automatically updated when you add or remove elements from the array.
//! typeof Operator: The typeof operator in JavaScript returns "object" for both arrays and regular objects.

//* JavaScript Array is a data structure that allows you to store and organize multiple values within a single variable. It is a versatile and dynamic object. It can hold various data types, including numbers, strings, objects, and even other arrays. Arrays in JavaScript are zero-indexed i.e. the first element is accessed with an index 0, the second element with an index of 1, and so forth.

//* ======================================
//*  Creating Arrays:
//* =====================================

//? Arrays in JavaScript can be created using the Array constructor or with array literals (square brackets []).

//? Using Array constructor
// let fruits = new Array(5) //length (not value)
// let fruits =  Array(5) //aa b chaale
// let fruits =  Array.of(5,8,9) //aa b chaale
// let fruits = new Array('apple', 'orange', 'banana')

//?convet iterable into array
const moreNumbers = Array.from('hi!');

// console.log(moreNumbers); //["h","i","!"]


//? Using array literal
// let fruits = ["apple", "orange", "banana","apple", "orange"];
// console.log(fruits);
// console.log(fruits.length);
// console.log(fruits[0]);
// console.log(fruits[1]);
// console.log(fruits[86]);
// console.log(fruits[87]);

//? we can also create an empty array
// let arr = [];
// console.log(typeof arr);

//* ======================================
//*  Accessing Elements:
//* =====================================
//?👉 Accessing Elements:  Array elements are accessed using zero-based indices.
// let fruits = ["apple", "orange", "banana"];
// console.log(fruits[3]);
// console.log(fruits["apple"]);

//? EcmaScript 2022 .at() : it helps toindex from lastelements

                // 0 ,       1,       2 ,      3 
// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// .at() ===      -4        -3        -2        -1


// console.log(fruits.at(-4)); //banana
// console.log(fruits.at(-1));
// console.log(fruits.at(-2));
// console.log(fruits.at(1));
// console.log(fruits.at(2));
// console.log(fruits.at(3));

//* ======================================
//*  Modifying Elements:
//* =====================================
//?👉  Modifying Elements: You can modify array elements by assigning new values to specific indices.

// let fruits = ["apple", "orange", "banana", "apple", "orange", "banana","apple", "orange", "banana","apple", "orange", "banana","apple", "orange", "banana","apple", "orange", "banana","apple", "orange", "banana","apple", "orange", "banana","apple", "orange", "banana","apple", "orange", "banana","apple", "orange", "banana","apple", "orange", "banana",];
// let fruits = [798,987,7,987,987,978,798,798,79,879,797,97,979,]
// fruits[2] = "vgtvgvgvgh";
// console.log(fruits.length);

//* =============================================
//*  Array Traversal / Iterating Over Arrays
//* ============================================
//?👉 Array Traversal / Iterating Over Arrays

let fruits = ["apple", "orange", "mango", "grapes", "banana"];

//? 1: for of loop , also known as iterable
//* for...of Loop: The for...of loop is used to iterate over the values of an iterable object, such as arrays, strings, or other iterable objects.

// for...of  loop:
// for (let item of fruits) {
//   console.log(item);
// }

// Simple for loop:
// const a= -1
// for (let item = 0; item < fruits.length ; item++) {
//   console.log(fruits[item]);
// }
// for (let item = 0; item <= a; item++) {
//   if (fruits[item]=== "banana") {
//     console.log(`yes i found mango on INDEX = ${item}`);
//   }
// }

//? 2: for in loop
//* for...in Loop: The for...in loop is used to iterate over the properties (including indices) of an object.

// for (let item in fruits) {
//   console.log(item);
// }

// ? 3: forEach Method
//* The arr.forEach() method calls the provided function once for each element of the array. The provided function may perform any kind of operation on the elements of the given array.

const myForEachArr =  fruits.forEach((fruit, index, arr) => {
  console.log(` my fav fruit is at index=${index}  value=${fruit}`);
   `${fruit}`
    console.log(arr);
});
console.log(myForEachArr);

// ? 4: map function
//* map() creates a new array from calling a function for every array element. map() does not change the original array.

// const myMapArr = fruits.map((fruit, index , arr) => {
//   // console.log(arr);
//   return ` my fav fruit is at index=${index}  value=${fruit}`;
// });

// console.log(myMapArr);
// console.log(fruits);

//todo Practice Time
//! write a program to Multiply each element with 2
// const numbers = [1, 2, 3, 4, 5];
// // forEach -  Performs an action on each element
// // map -  Creates a new array with transformed elements

// numbers.forEach((curElem) => {
//   console.log(curElem * 2);
//   //   Performs an action on each element
// });

// const doubleValue = numbers.map((curElem) => {
//   return curElem * 2;
//   //   Creates a new array with transformed elements
// });

// console.log(doubleValue);

//* Key Differences
//! Return Value:
//? forEach: It doesn't return a value. The forEach method is used for iterating over the elements of an array and performing a side effect, such as modifying the array or performing a task for each element.

//? map: It returns a new array containing the results of applying a function to each element in the original array. The original array remains unchanged.

//! Chaining:
//? forEach: It doesn't return a value, so it cannot be directly chained with other array methods.

//? map: Since it returns a new array, you can chain other array methods after using map.

//* Use Case:
//? forEach: Used when you want to iterate over the array elements and perform an action on each element, but you don't need a new array.

//? map: Used when you want to create a new array based on the transformation of each element in the original array.

//* ==========================================================================
//*  How to Insert, Add, Replace and Delete Elements in Array(CRUD) - p1
//* ==========================================================================

//? 👉 How to Insert, Add, Replace and Delete Elements in Array(CRUD)
// let fruits = ["apple", "orange", "mango", "grapes", "banana"];

//? 1: push(): Method that adds one or more elements to the end of an array.
// console.log(fruits.push("guava"));
// console.log(fruits);
// The push() method returns the new length.
//? 2: pop(): Method that removes the last element from an array.
// console.log(fruits.pop());
// console.log(fruits);
//? 3: unshift(): Method that adds one or more elements to the beginning of an array.
// console.log(fruits.unshift("guava"));
// console.log(fruits);
//? 4: shift(): Method that removes the first element from an array.
// console.log(fruits.shift());
// console.log(fruits);

//* ==========================================================================
//*  what if, we want to add or remove anywhere in an elements - p2
//* ==========================================================================

//? The splice() method of Array instances changes the contents of an array by removing or replacing existing elements and/or adding new elements in place

//* syntax
//? splice(index, howManyDelete, item1, ....., itemX)
// let fruits = ["apple", "orange", "banana", "mango"];
// fruits.splice(2, 2 , "ghvvhg");
// fruits.splice(0); //delete all items
// console.log(fruits);

// //! what if you want to add the element at the end
// fruits.splice(-1, 0,"vvgvhg");
// fruits.splice(1, 0, "grapes");
// console.log(fruits);


// const myFish = ["angel", "clown", "mandarin", "sturgeon"];

//? retruns the deleted elements
// const removed = myFish.splice(-2, 1);

// myFish is ["angel", "clown", "sturgeon"]
// removed is ["mandarin"]

// const myFish = ["angel", "clown", "mandarin"];
// const removed = myFish.splice(myFish.length, 0, "sturgeon");

// myFish is ["angel", "clown", "mandarin", "sturgeon"]
// no items removed


//* =========================================
//*  Slice in an Array
//* =========================================

// ?copying arrays
// ! Not pass by reference
// const a = [1,2,4,4,6,67,77]
// const b = a.slice(); //copy krse 

// console.log(". ~ file: 1. arrays.js:227 ~ b:", b);


// The slice() method in JavaScript is used to extract a shallow copy of a portion of an array or string without modifying the original. It can be used on both arrays and strings, and it returns a new array or string containing the extracted portion.

// Syntax of slice()
// javascript
// Copy code
// arr.slice(start, end);
// start (optional): The index at which to begin extraction. If not provided, it defaults to 0.
// end (optional): The index at which to stop extraction (but not including the element at this index). If not provided, it extracts until the end of the array or string.
// Both start and end can be negative, in which case they are counted from the end of the array/string.

// Negative indexes: Start counting from the end of the array or string. For example, -1 is the last element, -2 is the second last element, and so on.
// How slice() Works
// The slice() method does not modify the original array or string. Instead, it returns a new array or string that contains the extracted portion.

// Example 1: Using slice() on Arrays
// javascript
// Copy code
// const arr = [1, 2, 3, 4, 5];

// const slicedArr = arr.slice(1, 4);
// console.log(slicedArr); // Output: [2, 3, 4]
// console.log(arr);       // Output: [1, 2, 3, 4, 5] (original array is not modified)
// In this example:

// arr.slice(1, 4) starts at index 1 and ends at index 4, but does not include the element at index 4.
// The original arr remains unchanged.
// Example 2: Using slice() with Negative Indexes
// javascript
// Copy code
// const arr = [10, 20, 30, 40, 50];

// const slicedArr = arr.slice(-3, -1);
// console.log(slicedArr); // Output: [30, 40]
// console.log(arr);       // Output: [10, 20, 30, 40, 50]
// In this example:

// arr.slice(-3, -1) starts from the third-to-last element (index -3, which is 30) and ends just before the last element (index -1, which is 50).
// Example 3: Using slice() without end Parameter
// javascript
// Copy code
// const arr = ['apple', 'banana', 'cherry', 'date'];

// const slicedArr = arr.slice(2);
// console.log(slicedArr); // Output: ['cherry', 'date']
// console.log(arr);       // Output: ['apple', 'banana', 'cherry', 'date']
// In this case:

// arr.slice(2) extracts elements starting from index 2 (which is 'cherry') to the end of the array.
// The original array is not modified.
// Example 4: Using slice() on Strings
// javascript
// Copy code
// const str = "Hello, World!";

// const slicedStr = str.slice(7, 12);
// console.log(slicedStr); // Output: "World"
// console.log(str);       // Output: "Hello, World!" (original string is not modified)
// In this example:

// str.slice(7, 12) extracts the portion of the string starting at index 7 and ending just before index 12, which is "World".
// The original string remains unchanged.
// Example 5: Using Negative Indexes with Strings
// javascript
// Copy code
// const str = "JavaScript";

// const slicedStr = str.slice(-6, -1);
// console.log(slicedStr); // Output: "cript"
// console.log(str);       // Output: "JavaScript"
// Here:

// str.slice(-6, -1) extracts the substring starting from the sixth-to-last character and ending just before the last character, which results in "cript".
// Edge Cases
// Empty Array or String
// If the start index is greater than or equal to the array length (or string length), an empty array or string will be returned.
// javascript
// Copy code
// const arr = [1, 2, 3];
// console.log(arr.slice(5)); // Output: []
// Negative start Index
// If start is negative, it is treated as an offset from the end of the array or string.
// javascript
// Copy code
// const arr = [1, 2, 3, 4, 5];
// console.log(arr.slice(-3, -1)); // Output: [3, 4]
// start greater than end
// If the start index is greater than the end index, an empty array will be returned.
// javascript
// Copy code
// const arr = [10, 20, 30, 40, 50];
// console.log(arr.slice(3, 2)); // Output: []
// Summary of slice()
// The slice() method creates a shallow copy of a portion of an array or string.
// It does not modify the original array or string.
// It takes two parameters: start and end, where the end index is not included.
// It can accept negative indices, counting from the end of the array or string.
// If start is greater than or equal to the length, an empty array or string will be returned.
// It is a commonly used method for extracting portions of arrays or strings.


//* =========================================
//*  Concat in an Array
//* =========================================

// The concat() method in JavaScript is used to merge two or more arrays or strings into a new array or string. It does not modify the original arrays or strings; instead, it returns a new one with the combined values.

// Syntax of concat()
// For Arrays:
// array.concat(value1, value2, ..., valueN);
// value1, value2, ..., valueN: The arrays or values to be merged into the array.

// For Strings:
// string.concat(string2, string3, ..., stringN);
// string2, string3, ..., stringN: The strings to be concatenated.

// How concat() Works
// The concat() method does not modify the original array or string. Instead, it returns a new array or new string that contains the combined values.

// Example 1: Using concat() on Arrays
// javascript
// Copy code
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// const arr3 = [7, 8, 9];

// const mergedArr = arr1.concat(arr2, arr3);
// console.log(mergedArr); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(arr1);      // Output: [1, 2, 3] (original array is not modified)
// In this example:

// arr1.concat(arr2, arr3) merges the contents of arr1, arr2, and arr3 into a new array.
// The original arrays arr1, arr2, and arr3 are not modified.
// Example 2: Concatenating Single Values to an Array
// You can also concatenate individual values to an array.

// javascript
// Copy code
// const arr = [1, 2, 3];
// const newArr = arr.concat(4, 5);
// console.log(newArr); // Output: [1, 2, 3, 4, 5]
// console.log(arr);    // Output: [1, 2, 3] (original array is not modified)
// Here:

// arr.concat(4, 5) concatenates the values 4 and 5 to the array arr.
// Example 3: Concatenating Nested Arrays
// If you concatenate an array that contains other arrays, it does not flatten the arrays by default.

// javascript
// Copy code
// const arr1 = [1, 2];
// const arr2 = [3, 4];
// const arr3 = [5, 6];

// const newArr = arr1.concat(arr2, arr3);
// console.log(newArr); // Output: [1, 2, 3, 4, 5, 6]
// However, if you want to flatten nested arrays, you would need to use methods like flat() in addition to concat().

// Example 4: Using concat() with Strings
// javascript
// Copy code
// const str1 = "Hello";
// const str2 = " ";
// const str3 = "World!";

// const newStr = str1.concat(str2, str3);
// console.log(newStr); // Output: "Hello World!"
// console.log(str1);   // Output: "Hello" (original string is not modified)
// In this example:

// str1.concat(str2, str3) concatenates the strings str2 and str3 to str1, resulting in "Hello World!".
// Example 5: Concatenating Arrays and Strings
// You can concatenate arrays with strings, and vice versa.

// javascript
// Copy code
// const arr = [1, 2, 3];
// const str = "4";

// const result = arr.concat(str);
// console.log(result); // Output: [1, 2, 3, "4"]
// Here, arr.concat(str) concatenates the string "4" to the array, resulting in an array with a string value.

// Key Points About concat()
// Does Not Modify the Original Array/String:

// concat() returns a new array or string, leaving the original unchanged.
// Concatenates Arrays and Strings:

// It can concatenate multiple arrays or strings into one.
// Shallow Concatenation:

// concat() is a shallow merge. If you are concatenating nested arrays, the nested arrays will be added as elements (not flattened).
// Can Concatenate Values:

// You can concatenate individual values to an array or string.
// Difference Between concat() and push()
// concat() creates a new array and leaves the original unchanged.
// push() adds elements to the end of the existing array and modifies it.
// Example: concat() vs push()
// javascript
// Copy code
// const arr = [1, 2, 3];

// // Using `concat()`
// const newArr = arr.concat(4, 5);
// console.log(newArr); // Output: [1, 2, 3, 4, 5]
// console.log(arr);    // Output: [1, 2, 3] (original array is unchanged)

// // Using `push()`
// arr.push(4, 5);
// console.log(arr);    // Output: [1, 2, 3, 4, 5] (original array is modified)
// Conclusion
// The concat() method is a simple yet powerful tool in JavaScript for:

// Merging arrays and strings.
// It returns a new array or string without modifying the original.
// It supports both arrays and individual values for concatenation.


//* =========================================
//*  Searching in an Array
//* =========================================
//?👉  Searching and Filter in an Array

//? For Search we have - indexOf, lastIndexOf & includes
// const numbers = [
//   "apple",
//   "orange",
//   "banana",
//   "mango",
//   "grapes",
//   "lichi",
//   "banana",
//   "watermellon",
// ];

//?1: indexOf Method: The indexOf method returns the first index at which a given element can be found in the array, or -1 if it is not present.
// syntax
// indexOf(searchElement);
// indexOf(searchElement, fromIndex);
// console.log(numbers.indexOf()); // returns -1 
// console.log(numbers.indexOf("banana" , 3)); 

//? 2: lastIndexOf Method: The lastIndexOf() method of Array instances returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
const numbers = [1, 2, 3, 6, 4, 5, 6, 7, 8, 9];
// const result1 = numbers.indexOf(6 ,4);
// console.log(result1);
// const result2 = numbers.lastIndexOf(6);
// console.log(result2);
// const result3 = numbers.indexOf(6, 5);
// console.log(result);

//? 3: The includes method checks whether an array includes a certain element, returning true or false.
// Syntax
// includes(searchElement);
// includes(searchElement, fromIndex);

// const numbers = [1, 2, 3, 6, 4, 5, 6, 7, 8, 9];
const result = numbers.includes(2 ,4 );
// console.log(numbers.indexOf());

//todo Challenge time
//? 1: Add Dec at the end of an array?
//? 2: What is the return value of splice method?
//? 3: Update march to March (update)?
//? 4: Delete June from an array?

// const months = ["Jan", "march", "April", "June", "July"];

// // 1
// months.splice(months.length, 0, "Dec");
// // console.log(months);

// // 2:
// // When used to add elements, the splice method returns an empty array ([]).

// // 3
// const indexToUpdate = months.indexOf("march");
// months.splice(indexToUpdate, 1, "March");
// // console.log(months);

// // 4
// const indexToDelete = months.indexOf("June");
// months.splice(indexToDelete, 1);
// console.log(months);

//* =========================================
//*  Filter in an Array
//* =========================================
//? Search +  Filter
// const numbers = [1, 2, 3, 4, 5, 4, 6, 7, 8, 6, 9];

//? 1: find Method: The find method is used to find the first element in an array that satisfies a provided testing function. It returns the first matching element or undefined if no element is found.

// const result = numbers.find((curElem) => {
//   return curElem > 6;
// });

// console.log(result);

//? 2: findIndex Method: The findIndex() method of TypedArray instances returns the index of the first element in a typed array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const result = numbers.map((curElem) => curElem * 5);
// console.log(result);
// const result2 = result.findIndex((curElem) => {
//   return curElem > 15;
// });
// console.log(result2);

//* 3:  filter Method: The filter method creates a new array with all elements that pass the test implemented by the provided function.
// syntax:
//? filter(callbackFn)
//? filter(callbackFn, thisArg)

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const result = numbers.filter((curElem) => {
//   return curElem > 4;
// });

// console.log(result);

// UseCase: In E-commerce website when we want to Remove or delete any product from addToCart page.
//! Ex. le'ts say user wants to delete value 6.
// let value = 6;
// const numbers = [1, 2, 3, 4, 6, 5, 6, 7, 8, 9];

// let updatedCart = numbers.filter((curElem) => {
//   return curElem !== value;
// });

// console.log(updatedCart);

// Practice time
// !Example 2: Filtering Products by Price
// const products = [
//   { name: "Laptop", price: 1200 },
//   { name: "Phone", price: 800 },
//   { name: "Tablet", price: 300 },
//   { name: "Smartwatch", price: 150 },
// ];
// // Filter products with a price less than or equal to 500

// const filterProducts = products.filter((curElem) => {
//   //   console.log(curElem.price <= 500);
//   return curElem.price <= 500;
// });
// console.log(filterProducts);

// //! Filter unique values
// const numbers = [1, 2, 3, 4, 6, 5, 6, 7, 8, 9];
// let uniqueValues = numbers.filter((curElem, index, arr) => {
//   //   console.log(index);
//   //   console.log(arr.indexOf(curElem));
//   return arr.indexOf(curElem) === index;
// });
// console.log(uniqueValues);
// console.log([...new Set(numbers)]);

//* =========================================
//*  How to Reverse an Array
//* =========================================
// reverse()
// ChatGPT said:
// ChatGPT
// The reverse() method in JavaScript is used to reverse the order of the elements in an array. This method modifies the original array by reversing its elements in place and returns a reference to the same array.

// Syntax of reverse()
// javascript
// Copy code
// array.reverse();
// No parameters: The reverse() method works directly on the array and reverses its order of elements.
// How reverse() Works
// The reverse() method:

// Reverses the order of elements in the original array.
// Mutates the array, meaning it changes the original array and does not create a new array.
// Returns the same array after reversing it.
// Example 1: Reversing an Array
// javascript
// Copy code
// const arr = [1, 2, 3, 4, 5];

// const reversedArr = arr.reverse();
// console.log(reversedArr); // Output: [5, 4, 3, 2, 1]
// console.log(arr);         // Output: [5, 4, 3, 2, 1] (original array is modified)
// In this example:

// arr.reverse() reverses the order of elements in the array.
// The original array arr is modified.
// The reverse() method returns the reversed array.
// Example 2: Reversing an Empty Array
// javascript
// Copy code
// const emptyArr = [];
// console.log(emptyArr.reverse()); // Output: []
// Reversing an empty array still results in an empty array because there are no elements to reverse.
// Example 3: Reversing an Array of Strings
// javascript
// Copy code
// const words = ['apple', 'banana', 'cherry'];
// console.log(words.reverse()); // Output: ['cherry', 'banana', 'apple']
// Here:

// The elements of the words array (strings) are reversed.
// The original array words is modified.
// Example 4: Reversing an Array of Numbers
// javascript
// Copy code
// const numbers = [10, 20, 30, 40];
// console.log(numbers.reverse()); // Output: [40, 30, 20, 10]
// In this case:

// The elements of the numbers array are reversed.
// The original array numbers is modified in place.
// Example 5: Reversing an Array of Objects
// javascript
// Copy code
// const people = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }];
// console.log(people.reverse()); 
// // Output: [{ name: 'Charlie' }, { name: 'Bob' }, { name: 'Alice' }]
// In this example:

// The objects in the array are reversed.
// The original array people is modified.
// Important Notes
// Mutates the Original Array:

// The reverse() method changes the order of elements in the original array. If you don't want to modify the original array, you should create a copy of the array before using reverse().
// Returns the Reversed Array:

// The method returns the same array after reversing it, not a new one.
// Works Only on Arrays:

// The reverse() method is available only for arrays, and it doesn't work on strings, even though strings can be iterated over.
// Does Not Work on Objects:

// Since objects do not have a well-defined order like arrays, reverse() does not work on them.
// Example of Avoiding Mutation Using slice()
// If you want to reverse an array without modifying the original array, you can use slice() to create a shallow copy before reversing it:

// javascript
// Copy code
// const originalArr = [1, 2, 3, 4];

// const reversedArr = originalArr.slice().reverse();

// console.log(originalArr); // Output: [1, 2, 3, 4] (original array is not modified)
// console.log(reversedArr); // Output: [4, 3, 2, 1] (new reversed array)
// In this example:

// originalArr.slice() creates a shallow copy of the array.
// reverse() is then called on the copy, preserving the original array.
// Conclusion
// The reverse() method reverses the order of elements in an array.
// It modifies the original array and returns a reference to the same reversed array.
// If you need to preserve the original array, use a method like slice() before calling reverse().

//* =========================================
//*  How to Sort and Compare an Array
//* =========================================
//? How to Sort and Compare an Array
//? Sorting an Array: The sort method sorts the elements of an array in place and returns the sorted array. By default, it sorts elements as strings.

// const fruits = ["Banana", "Apple", "Orange", "Mango"];
// const numbers = [1, 2, 4, 3, 6, 5, 6, 7, 4, 8, 9];

// console.log(numbers);

//? compare callback function
// syntax
// const sortedNumbers = numbers.sort((a, b) => a - b);
// if(a>b) return 1  => switch the order
//  if(b>a) return -1  => keep the order

// numbers.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });

// console.log(numbers);

//? For ascending order
// const sortedNumbers = numbers.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   } else if (b > a) {
//     return -1;
//   }
// });

//? For descending order
// const sortedNumbers = numbers.sort((a, b) => {
//   if (a > b) {
//     return -1;
//   } else if (b > a) {
//     return 1;
//   }
// });
//* =========================================
//*  join and split
//* =========================================
// join
// ChatGPT said:
// ChatGPT
// The join() method in JavaScript is used to join all the elements of an array into a single string. It takes an optional parameter that specifies the separator to use between the elements.

// Syntax of join()
// javascript
// Copy code
// array.join(separator);
// separator (optional): A string that separates each pair of elements. If not provided, the default separator is a comma (,).
// If you pass an empty string ("") as a separator, the elements will be concatenated without any spaces between them.
// How join() Works
// The join() method combines all the elements of the array into a single string.
// The separator you specify is inserted between the elements.
// It does not modify the original array but returns a new string.
// Example 1: Using join() with Default Separator (Comma)
// javascript
// Copy code
// const arr = ['apple', 'banana', 'cherry'];
// const result = arr.join();
// console.log(result); // Output: "apple,banana,cherry"
// In this case:

// By default, join() uses a comma (,) as the separator.
// Example 2: Using join() with Custom Separator
// You can specify a custom separator by passing a string to the join() method.

// javascript
// Copy code
// const arr = ['apple', 'banana', 'cherry'];
// const result = arr.join(' - ');
// console.log(result); // Output: "apple - banana - cherry"
// Here:

// The separator is a space, hyphen, and space (" - "), which is placed between the elements.
// Example 3: Using join() with Empty String as Separator
// If you pass an empty string as the separator, the elements will be concatenated without any space.

// javascript
// Copy code
// const arr = ['a', 'b', 'c'];
// const result = arr.join('');
// console.log(result); // Output: "abc"
// In this example:

// The elements of the array are joined together without any separator.
// Example 4: Using join() with a Different Separator
// You can use any string as the separator. For instance, a semicolon (;):

// javascript
// Copy code
// const arr = ['John', 'Paul', 'George', 'Ringo'];
// const result = arr.join('; ');
// console.log(result); // Output: "John; Paul; George; Ringo"
// Here:

// The separator is "; ", so each name is separated by a semicolon and a space.
// Example 5: Using join() with an Array of Numbers
// javascript
// Copy code
// const numbers = [1, 2, 3, 4, 5];
// const result = numbers.join(' + ');
// console.log(result); // Output: "1 + 2 + 3 + 4 + 5"
// In this case:

// The numbers are joined together with " + " as the separator.
// Example 6: Edge Case: Empty Array
// If the array is empty, join() will return an empty string.

// javascript
// Copy code
// const emptyArr = [];
// const result = emptyArr.join();
// console.log(result); // Output: ""
// In this case:

// Since the array is empty, the result is an empty string ("").
// Example 7: Joining Array with undefined or null Elements
// If an array contains undefined or null, those elements are converted to an empty string during the join() operation.

// javascript
// Copy code
// const arr = [1, null, 2, undefined, 3];
// const result = arr.join(' - ');
// console.log(result); // Output: "1 -  - 2 -  - 3"
// In this example:

// null and undefined are converted to empty strings when joined.
// Key Points About join()
// Does Not Modify the Original Array:

// The join() method returns a new string and does not change the original array.
// Separator:

// You can specify any string as a separator, or use the default comma if no separator is provided.
// Concatenation of Array Elements:

// It concatenates array elements into a single string, separating them with the specified separator.
// Handling of undefined and null:

// Elements with undefined or null values are converted to empty strings during the join operation.
// Conclusion
// The join() method is a convenient way to convert an array into a string, with an optional separator between elements. It is especially useful when you need to combine array elements into a readable or formatted string.

// Let me know if you need more examples or explanations! 😊






// You said:
// split
// ChatGPT said:
// ChatGPT
// The split() method in JavaScript is used to split a string into an array of substrings, based on a specified separator. The split() method can take a string or a regular expression as the separator.

// Syntax of split()
// javascript
// Copy code
// string.split(separator, limit);
// separator (optional): The character, string, or regular expression that specifies where each split should occur.
// If not provided, the entire string is returned as a single element in the array.
// limit (optional): An integer that specifies the maximum number of splits. If provided, it limits the number of substrings in the resulting array.
// How split() Works
// The split() method breaks a string into an array of substrings.
// Each substring is created based on where the separator occurs in the original string.
// It does not modify the original string but returns a new array of substrings.
// Example 1: Splitting a String by Space
// javascript
// Copy code
// const str = "Hello World JavaScript";
// const arr = str.split(' ');
// console.log(arr); // Output: ["Hello", "World", "JavaScript"]
// In this case:

// The string is split wherever a space (' ') occurs, resulting in an array of words.
// Example 2: Splitting a String by Comma
// javascript
// Copy code
// const str = "apple,banana,cherry";
// const arr = str.split(',');
// console.log(arr); // Output: ["apple", "banana", "cherry"]
// Here:

// The string is split at each comma (,), and each fruit becomes an element in the array.
// Example 3: Using a Regular Expression as Separator
// You can use regular expressions as separators. For example, to split by any whitespace (space, tab, newline):

// javascript
// Copy code
// const str = "apple banana\tcherry\norange";
// const arr = str.split(/\s+/); // Split by one or more whitespace characters
// console.log(arr); // Output: ["apple", "banana", "cherry", "orange"]
// In this case:

// The regular expression /\s+/ matches one or more whitespace characters, splitting the string at every space, tab, or newline.
// Example 4: Limiting the Number of Splits
// You can specify a limit to restrict the number of elements in the resulting array.

// javascript
// Copy code
// const str = "apple,banana,cherry,orange";
// const arr = str.split(',', 2);
// console.log(arr); // Output: ["apple", "banana"]
// Here:

// The split() method splits the string at each comma, but only the first two substrings are returned because the limit is set to 2.
// Example 5: Splitting by Empty String
// If you provide an empty string ("") as the separator, each character of the string becomes an individual element in the array.

// javascript
// Copy code
// const str = "hello";
// const arr = str.split('');
// console.log(arr); // Output: ["h", "e", "l", "l", "o"]
// In this case:

// The string is split between each character, resulting in an array of individual characters.
// Example 6: Splitting with No Separator
// If you omit the separator entirely, the split() method will return the entire string as the only element in the array.

// javascript
// Copy code
// const str = "apple,banana,cherry";
// const arr = str.split();
// console.log(arr); // Output: ["apple,banana,cherry"]
// In this case:

// The entire string is returned as a single element in the array because no separator is provided.
// Example 7: Split with undefined or null Separator
// If you pass undefined or null as the separator, JavaScript will treat it as if you didn't provide a separator, effectively splitting the string at each character.

// javascript
// Copy code
// const str = "apple,banana,cherry";
// const arr = str.split(undefined);
// console.log(arr); // Output: ["apple,banana,cherry"]
// In this case:

// The result is the entire string as one element in the array, similar to when the separator is omitted.
// Edge Case: Empty String
// If the string is empty and you call split(), it will return an array with a single empty string element, unless you specify a limit.

// javascript
// Copy code
// const str = "";
// const arr = str.split(',');
// console.log(arr); // Output: [""]
// In this case:

// Since the string is empty, the array will contain one empty string.
// Key Points About split()
// Does Not Modify the Original String:

// The split() method returns a new array without changing the original string.
// Separator is Optional:

// If no separator is provided, the entire string is returned as a single element in the array.
// Limit the Number of Splits:

// You can optionally pass a limit to restrict the number of elements in the resulting array.
// Uses Regular Expressions:

// You can use regular expressions for complex splitting scenarios.
// Conclusion
// The split() method is an essential string manipulation tool in JavaScript that allows you to break a string into an array of substrings. It's particularly useful when you need to process or analyze individual components of a string, such as parsing CSV data or breaking down a sentence into words.

// Let me know if you need more examples or further clarification! 😊


//* =========================================
//*  Very Important Array Methods
//* =========================================

//? Map(), Filter(), Reduce(),
// map() creates a new array from calling a function for every array element.
// map() does not execute the function for empty elements.
// map() does not change the original array.

// Original array of numbers
// const numbers = [1, 2, 3, 4, 5];

//! Using map to square each number and create a new array
// const numbers = [1, 2, 3, 4, 5];

// let result = numbers.map((curElem) => curElem * curElem);
// console.log(result);

//! 1: Using the map method, write a function that takes an array of strings and returns a new array where each string is capitalized.
// Original array of strings
const words = ["APPLE", "banana", "cherry", "date"];

// const result = words.map((curElem) => {
//   return curElem.toLowerCase();
// });

// console.log(result);

//! 2: Using the map method, write a function that takes an array of numbers and returns a new array where each number is squared, but only if it's an even number.

// Original array of numbers
// const numbers = [1, 2, 3, 4, 5];

// const result = numbers
//   .map((curElem) => {
//     if (curElem % 2 === 0) {
//       return curElem * curElem;
//     }
//   })
//   .filter((curElem) => curElem !== undefined);

// console.log(result);

// const evenSquare = numbers
//   .map((curNum) => (curNum % 2 === 0 ? curNum * curNum : undefined))
//   .filter((curElem) => curElem !== undefined);

// console.log(evenSquare);

//! 3: Using the map method, write a function that takes an array of names and returns a new array where each name is prefixed with "Mr. ".

// const names = ["ram", "vinod", "laxman"];
// const prefixName = names.map((curName) => `Mr. ${curName}`);
// console.log(prefixName);

//? Reduce method
// The reduce method in JavaScript is used to accumulate or reduce an array to a single value. It iterates over the elements of an array and applies a callback function to each element, updating an accumulator value with the result. The reduce method takes a callback function as its first argument and an optional initial value for the accumulator as the second argument.
// syntax
// array.reduce(function callback(accumulator, currentValue, index, array) {
//   // Your logic here
//   // Return the updated accumulator value
// }, initialValue);

// callback: A function that is called once for each element in the array.
// accumulator: The accumulated result of the previous iterations.
// currentValue: The current element being processed in the array.
// index (optional): The index of the current element being processed.
// array (optional): The array reduce was called upon.
// initialValue (optional): An initial value for the accumulator. If not provided, the first element of the array is used as the initial accumulator value.

const productPrice = [100, 200, 300, 400, 500];

const totalPrice = productPrice.reduce((accum, curElem) => {
  return accum + curElem;
}, 0);

console.log(totalPrice);


// Chaining Methods in JavaScript
// With all these useful array methods you learned about, it's important to understand how you can combine them. Let's take map() and reduce() as an example:

// const originalArray = [{price: 10.99}, {price: 5.99}, {price: 29.99}];
// const transformedArray = originalArray.map(obj => obj.price); // produces [10.99, 5.99, 29.99]
// const sum = transformedArray.reduce((sumVal, curVal) => sumVal + curVal, 0); // => 46.97
// Of course, you could skip the map step and just add the extraction logic to reduce():

// const originalArray = [{price: 10.99}, {price: 5.99}, {price: 29.99}];
// const sum = originalArray.reduce((sumVal, curVal) => sumVal + curVal.price, 0); // => 46.97
// But let's say you have a more complex extraction logic and hence want to split this into multiple method calls. Or you have a re-usable map function which you want to be able to use in different places of your app. Then you can still write the initial example in a more concise way if you leverage method chaining:

// const originalArray = [{price: 10.99}, {price: 5.99}, {price: 29.99}];
// const sum = originalArray.map(obj => obj.price)
//     .reduce((sumVal, curVal) => sumVal + curVal, 0); // => 46.97
// We call .reduce() directly on the result of map() (which produces an array, that's why this is possible). Hence we can avoid storing the mapped array in a separate constant or variable that we might not need in any other place.



//* =========================================
//*  Spread Operator
//* =========================================



// spread operator
// ChatGPT said:
// ChatGPT
// The spread operator (...) in JavaScript is a powerful syntax that allows you to expand or "spread" elements of an iterable (like an array or object) into individual elements. It can be used in various contexts, such as copying, merging, and destructuring arrays or objects.

// Syntax
// javascript
// Copy code
// // For Arrays
// const arr = [...iterable];

// // For Objects
// const obj = {...iterable};
// Use Cases of the Spread Operator
// 1. Expanding an Array
// You can use the spread operator to spread the elements of an array into a new array.

// javascript
// Copy code
// const arr = [1, 2, 3];
// const newArr = [...arr, 4, 5];

// console.log(newArr); // Output: [1, 2, 3, 4, 5]
// 2. Copying an Array
// The spread operator is often used to clone an array, creating a shallow copy of it. This is helpful when you want to avoid modifying the original array.

// javascript
// Copy code
// const arr = [1, 2, 3];
// const arrCopy = [...arr];

// console.log(arrCopy); // Output: [1, 2, 3]
// 3. Merging Arrays
// You can merge multiple arrays into one using the spread operator.

// javascript
// Copy code
// const arr1 = [1, 2];
// const arr2 = [3, 4];
// const arr3 = [5, 6];

// const mergedArray = [...arr1, ...arr2, ...arr3];

// console.log(mergedArray); // Output: [1, 2, 3, 4, 5, 6]
// 4. Merging Objects
// The spread operator can also be used with objects to merge them or create a shallow copy.

// javascript
// Copy code
// const obj1 = { name: 'Alice', age: 25 };
// const obj2 = { city: 'New York', country: 'USA' };

// const mergedObj = { ...obj1, ...obj2 };

// console.log(mergedObj);
// // Output: { name: 'Alice', age: 25, city: 'New York', country: 'USA' }
// 5. Copying an Object
// Similar to arrays, you can use the spread operator to copy an object into another, creating a shallow copy.

// javascript
// Copy code
// const obj1 = { name: 'Alice', age: 25 };
// const objCopy = { ...obj1 };

// console.log(objCopy); // Output: { name: 'Alice', age: 25 }
// 6. Adding New Properties to an Object
// You can use the spread operator to add new properties to an existing object while retaining the original properties.

// javascript
// Copy code
// const obj1 = { name: 'Alice', age: 25 };
// const obj2 = { ...obj1, city: 'New York' };

// console.log(obj2);
// // Output: { name: 'Alice', age: 25, city: 'New York' }
// 7. Destructuring Arrays or Objects
// The spread operator can also be used in destructuring assignments to collect the remaining elements or properties into a new array or object.

// Array Destructuring:
// javascript
// Copy code
// const arr = [1, 2, 3, 4, 5];

// const [first, second, ...rest] = arr;

// console.log(first);  // Output: 1
// console.log(second); // Output: 2
// console.log(rest);   // Output: [3, 4, 5]
// Object Destructuring:
// javascript
// Copy code
// const person = { name: 'Alice', age: 25, city: 'New York' };

// const { name, ...otherInfo } = person;

// console.log(name);      // Output: Alice
// console.log(otherInfo); // Output: { age: 25, city: 'New York' }
// Differences Between Spread and Rest Operator
// Although the syntax is the same, spread and rest have different use cases.

// 1. Spread: Expanding Elements (Used in Arrays or Objects)
// The spread operator is used when you want to expand or copy elements or properties.

// javascript
// Copy code
// // Spread in arrays
// const arr = [1, 2, 3];
// const newArr = [...arr, 4, 5];  // Expanding the array into new elements

// // Spread in objects
// const obj = { name: 'Alice', age: 25 };
// const newObj = { ...obj, city: 'New York' }; // Expanding object properties
// 2. Rest: Collecting Remaining Elements (Used in Function Parameters or Destructuring)
// The rest operator is used when you want to collect remaining elements or arguments.

// javascript
// Copy code
// // Rest in function parameters
// function sum(...numbers) {
//   return numbers.reduce((acc, num) => acc + num, 0);
// }

// console.log(sum(1, 2, 3, 4)); // Output: 10

// // Rest in object destructuring
// const person = { name: 'Alice', age: 25, city: 'New York' };
// const { name, ...otherInfo } = person;

// console.log(otherInfo); // Output: { age: 25, city: 'New York' }
// Summary of Spread Operator Uses
// Array:

// Copying an array: const newArr = [...arr]
// Merging arrays: const merged = [...arr1, ...arr2]
// Expanding an array in function arguments: function(...arr)
// Object:

// Copying an object: const newObj = {...obj}
// Merging objects: const mergedObj = {...obj1, ...obj2}
// Adding new properties: const updatedObj = {...obj, newProperty: 'value'}
// Destructuring:

// For arrays: const [first, second, ...rest] = arr
// For objects: const {name, ...rest} = obj
// Conclusion
// The spread operator (...) is an incredibly useful tool in JavaScript for working with arrays and objects. It allows you to easily copy, merge, or expand collections, making your code more concise and readable.



