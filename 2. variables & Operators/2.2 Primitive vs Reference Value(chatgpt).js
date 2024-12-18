// primitive and reference values 
// ChatGPT said:
// ChatGPT
// In JavaScript, data types are divided into Primitive Values and Reference Values (also known as Objects). Understanding these two categories is crucial because they behave differently when assigned, compared, or passed to functions.

// Primitive Values
// Primitive values are immutable and are stored directly in memory as simple data. They are compared by value, and they do not have methods or properties (although wrapper objects can make it seem like they do).

// Characteristics of Primitive Values
// Immutable: Once created, they cannot be altered.
// Stored by value: A copy of the value is created when assigned to a variable.
// Types:
// string
// number
// boolean
// null
// undefined
// symbol
// bigint
// Examples of Primitive Values
// javascript
// Copy code
// let x = 10;     // Number
// let y = "Hi";   // String
// let isTrue = true; // Boolean
// let nothing = null; // Null
// let notDefined; // Undefined
// let sym = Symbol("id"); // Symbol
// let bigNum = 12345678901234567890n; // BigInt
// Immutable Behavior
// javascript
// Copy code
// let a = "Hello";
// a[0] = "h"; // Strings are immutable
// console.log(a); // Output: "Hello" (unchanged)

// let b = 10;
// let c = b; // A copy of 'b' is assigned to 'c'
// c = 20;
// console.log(b); // 10 (original value remains unchanged)
// console.log(c); // 20
// Reference Values
// Reference values are objects, arrays, or functions. They are stored by reference, meaning the variable holds a reference (or pointer) to the location in memory where the object is stored, not the actual value.

// Characteristics of Reference Values
// Mutable: The value can be modified.
// Stored by reference: When assigned to a variable, only the reference is copied.
// Types:
// Object
// Array
// Function
// Examples of Reference Values
// javascript
// Copy code
// let obj = { name: "Alice" }; // Object
// let arr = [1, 2, 3];         // Array
// let func = function () {     // Function
//   console.log("Hello");
// };
// Mutable Behavior
// javascript
// Copy code
// let person = { name: "John" };
// let anotherPerson = person; // Copying the reference, not the value

// anotherPerson.name = "Jane"; // Modifying the object
// console.log(person.name); // Output: "Jane" (affected because they share the same reference)
// console.log(anotherPerson.name); // Output: "Jane"
// Key Differences Between Primitive and Reference Values
// Aspect	Primitive Values	Reference Values
// Stored in memory	Value is stored directly.	Reference (pointer) to the object is stored.
// Assignment	A copy of the value is assigned.	A reference (same object) is assigned.
// Mutability	Immutable (cannot be changed).	Mutable (can be modified).
// Comparison	Compared by value.	Compared by reference (location in memory).
// Examples	string, number, boolean, etc.	Object, Array, Function, etc.
// Example: Assignment Behavior
// Primitive Values:
// javascript
// Copy code
// let a = 5;
// let b = a; // Copies the value of 'a' into 'b'
// b = 10;

// console.log(a); // 5 (unchanged)
// console.log(b); // 10
// Reference Values:
// javascript
// Copy code
// let obj1 = { value: 5 };
// let obj2 = obj1; // Copies the reference to 'obj1'

// obj2.value = 10;

// console.log(obj1.value); // 10 (changed because obj1 and obj2 point to the same object)
// console.log(obj2.value); // 10
// Example: Comparison Behavior
// Primitive Values:
// javascript
// Copy code
// let x = 10;
// let y = 10;

// console.log(x === y); // true (same value)
// Reference Values:
// javascript
// Copy code
// let obj1 = { value: 10 };
// let obj2 = { value: 10 };

// console.log(obj1 === obj2); // false (different memory references)
// Even though the objects have the same properties and values, they are stored in different memory locations, so they are not equal.

// How to Copy Reference Values (Deep Copy vs Shallow Copy)
// Shallow Copy
// A shallow copy copies only the first level of properties. Changes to nested objects affect the original.

// javascript
// Copy code
// let original = { name: "John", details: { age: 30 } };
// let copy = { ...original }; // Shallow copy using spread operator

// copy.details.age = 35;

// console.log(original.details.age); // 35 (affected)
// console.log(copy.details.age);     // 35
// Deep Copy
// A deep copy creates an entirely new object with all nested objects copied.

// javascript
// Copy code
// let original = { name: "John", details: { age: 30 } };
// let deepCopy = JSON.parse(JSON.stringify(original)); // Deep copy

// deepCopy.details.age = 35;

// console.log(original.details.age); // 30 (unaffected)
// console.log(deepCopy.details.age); // 35
// Summary
// Category	Primitive Values	Reference Values
// Mutability	Immutable	Mutable
// Stored	By value	By reference
// Examples	string, number, boolean, null	object, array, function
// Comparison	Compared by value	Compared by reference
// Key Takeaways
// Primitive values are simple, immutable data types stored directly in memory.
// Reference values are objects, arrays, or functions stored as references in memory.
// Changing a reference value affects all variables that point to the same object.
// Use deep copying for nested objects if you want to avoid shared references.