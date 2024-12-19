//* ==========================================
//*  Promise in JavaScript
//* ==========================================

//? A promise in JavaScript is an object that represents the eventual completion or failure of an asynchronous operation. It allows you to handle asynchronous operations more easily and cleanly by providing a way to write asynchronous code that looks synchronous.

//todo 👉 In simpler terms, a promise is like a placeholder for the result of an asynchronous operation. Or A container for the future result or value.

//* It can be in one of three states:

//? Pending: Initial state, neither fulfilled nor rejected.
//* Fulfilled(Resolved): The operation completed successfully.
//! Rejected: The operation failed or encountered an error.

//? Promises have built-in methods like "then" and "catch" to handle the results of asynchronous operations when they complete or encounter errors, making it easier to write asynchronous code that is more readable and maintainable compared to traditional callback-based approaches.

//* ==========================================
//* Using the Promise Constructor (Class):
//* ==========================================

//? You can create a promise using the Promise constructor. This involves creating a new instance of the Promise class, which takes a function as an argument. This function, often referred to as the "executor function," takes two parameters: resolve and reject. You call resolve when the asynchronous operation is successful and reject when it encounters an error.

//* real life example

//todo  1:  default state is pending

//todo 2:  Promise Made:  Your friend promises to call you after 2 days at 6 pm. This is similar to creating a promise in JavaScript.

//todo 3:  Pending Stage:  During the 2-day period, you're in a "pending" stage. You're not sure whether your friend will fulfill the promise (call you) or break the promise (not call you). Similarly, when you create a promise in JavaScript, it starts in a pending state until it either resolves (fulfills) or rejects.

//todo 4: Resolution at a Specific Time:  After 2 days and exactly at 6 pm, you'll know whether the promise is fulfilled (resolved) if your friend calls you, or if it's broken (rejected) if your friend doesn't call. This aligns with the idea that promises in JavaScript resolve or reject, often triggered by asynchronous operations, at a specific point in time.

//* ==========================================
//* 2: Using a Function (Promise Wrapper):
//* ==========================================

//? You can also create a promise by defining a function that returns a promise. This function usually encapsulates some asynchronous operation. Inside this function, you manually create a promise and resolve or reject it based on the result of the asynchronous operation.

// syntax
// function myPromiseFunction() {
//   return new Promise((resolve, reject) => {
//     // Asynchronous operations here
//     // If successful, call resolve(value)
//     // If there's an error, call reject(error)
//   });
// }

// const pr = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject("Sorry, I can't");
//   }, 2000);
// })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log("Don't worry, We all miss you and keep smiling");
//   });

// 1: By default promise has the pending state
// 2: the moment we use setTimeout, we need to handle promises, we can do using then and catch

//* ==========================================
//* Promise Methods
//* ==========================================

//? Promise.all is used when you want to wait for all promises to complete successfully. Reject state will throw an error.
      //koi 1 b Promise reject thse to error aapse, badhaa jj promise resolve thava joiieeeee.

//? Promise.allSettled is used when you want to wait for all promises to complete, regardless of success or failure, and get information about their outcomes.

//? Promise.race is used when you are interested in the result of the first promise that completes, regardless of success or failure.

// Example usage:

// The enrollStudent function returns a promise that resolves or rejects based on the success or failure of the enrollment process.
// The then method is used to handle the success case, printing a success message.
// The catch method is used to handle the failure case, printing an error message.
// The finally method is used to print a message indicating the completion of the enrollment process, whether successful or not.

// Example usage:
// const studentName = "Vinod";

// const enrollStudent = (studentName) => {
//   return new Promise((resolve, reject) => {
//     // Simulating asynchronous enrollment process
//     setTimeout(() => {
//       const isSuccessful = Math.random() > 0.4;

//       if (isSuccessful) {
//         resolve(`Enrollment successful for ${studentName}`);
//       } else {
//         reject(`Enrollment failed for ${studentName}. Please try again.`);
//       }
//     }, 2000);
//   });
// };

// enrollStudent(studentName)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     console.log("Enrollment process completed.");
//   });

const promise1 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("First"), 2000)
);

// const promise2 = new Promise((resolve) =>
//   setTimeout(() => resolve("Second"), 5000)
// );

const promise2 = new Promise((resolve, reject) =>
  setTimeout(() => reject("Failed"), 100)
);

const promise3 = new Promise((resolve) =>
  setTimeout(() => resolve("Third"), 1000)
);

// Promise.all([promise1, promise3, promise2])
//   .then((values) => {
//     console.log(values);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Promise.allSettled([promise1, promise2, promise3])
//   .then((values) => {
//     console.log(values);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

Promise.race([promise1, promise2, promise3])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.error(error);
  });


//? CHATGPT

//   Promises in JavaScript
// A Promise in JavaScript is an object that represents the eventual completion or failure of an asynchronous operation. It helps manage asynchronous tasks, making the code more readable and easier to handle than using traditional callbacks.

// Why Promises?
// Promises address issues like:

// Callback Hell: Deeply nested callbacks that are difficult to read and maintain.
// Error Handling: Promises provide a cleaner way to handle errors compared to callback-based code.
// States of a Promise
// A Promise can be in one of three states:

// Pending: Initial state; neither fulfilled nor rejected.
// Fulfilled: The operation completed successfully.
// Rejected: The operation failed.
// Once a Promise transitions from "pending" to either "fulfilled" or "rejected," it is settled and remains in that state.

// Creating a Promise
// The Promise constructor accepts a function (called the executor) with two parameters:

// resolve: A function to call when the Promise is fulfilled.
// reject: A function to call when the Promise is rejected.
// Example: Basic Promise
// javascript
// Copy code
// const myPromise = new Promise((resolve, reject) => {
//   const success = true; // Simulate success or failure
//   if (success) {
//     resolve('Operation was successful!');
//   } else {
//     reject('Operation failed!');
//   }
// });

// // Using the Promise
// myPromise
//   .then(result => {
//     console.log(result); // Outputs: "Operation was successful!"
//   })
//   .catch(error => {
//     console.error(error); // Handles any error
//   });
// Chaining Promises
// You can chain multiple .then() calls to handle a sequence of asynchronous tasks.

// Example: Promise Chaining
// javascript
// Copy code
// const fetchData = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve('Data fetched'), 1000);
//   });
// };

// fetchData()
//   .then(data => {
//     console.log(data); // Outputs: "Data fetched"
//     return 'Processing data';
//   })
//   .then(processedData => {
//     console.log(processedData); // Outputs: "Processing data"
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// Error Handling in Promises
// Use .catch() to handle errors, and .finally() to execute cleanup code regardless of success or failure.

// Example: Error Handling
// javascript
// Copy code
// const fetchData = () => {
//   return new Promise((resolve, reject) => {
//     const error = true; // Simulate an error
//     if (error) {
//       reject('Error occurred while fetching data');
//     } else {
//       resolve('Data fetched successfully');
//     }
//   });
// };

// fetchData()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error:', error); // Outputs: "Error: Error occurred while fetching data"
//   })
//   .finally(() => {
//     console.log('Cleanup tasks completed');
//   });
// Promise Methods
// 1. Promise.all
// Waits for all promises in an array to resolve. If one promise is rejected, the entire operation is rejected.

// javascript
// Copy code
// const p1 = Promise.resolve(10);
// const p2 = Promise.resolve(20);
// const p3 = Promise.resolve(30);

// Promise.all([p1, p2, p3])
//   .then(results => {
//     console.log(results); // Outputs: [10, 20, 30]
//   })
//   .catch(error => {
//     console.error(error);
//   });
// 2. Promise.race
// Returns the result of the first promise to settle (either fulfilled or rejected).

// javascript
// Copy code
// const p1 = new Promise(resolve => setTimeout(() => resolve('First'), 1000));
// const p2 = new Promise(resolve => setTimeout(() => resolve('Second'), 2000));

// Promise.race([p1, p2])
//   .then(result => {
//     console.log(result); // Outputs: "First"
//   });
// 3. Promise.any
// Returns the first fulfilled promise. If all are rejected, it throws an error.

// javascript
// Copy code
// const p1 = Promise.reject('Error 1');
// const p2 = Promise.resolve('Success 2');
// const p3 = Promise.resolve('Success 3');

// Promise.any([p1, p2, p3])
//   .then(result => {
//     console.log(result); // Outputs: "Success 2"
//   })
//   .catch(error => {
//     console.error(error);
//   });
// 4. Promise.allSettled
// Waits for all promises to settle (fulfilled or rejected) and returns an array of their outcomes.

// javascript
// Copy code
// const p1 = Promise.resolve('Resolved');
// const p2 = Promise.reject('Rejected');

// Promise.allSettled([p1, p2]).then(results => {
//   console.log(results);
//   // Outputs:
//   // [
//   //   { status: 'fulfilled', value: 'Resolved' },
//   //   { status: 'rejected', reason: 'Rejected' }
//   // ]
// });
// Async/Await: A Cleaner Alternative
// async/await provides a more readable way to work with Promises.

// Example
// javascript
// Copy code
// const fetchData = () => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve('Data fetched'), 1000);
//   });
// };

// async function handleData() {
//   try {
//     const data = await fetchData();
//     console.log(data); // Outputs: "Data fetched"
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     console.log('Cleanup tasks completed');
//   }
// }

// handleData();
// Summary
// A Promise is a powerful abstraction for handling asynchronous operations.
// It improves readability and error handling compared to traditional callbacks.
// Use .then() for chaining, .catch() for error handling, and .finally() for cleanup.
// Combine Promises with methods like Promise.all, Promise.race, and Promise.any for advanced control.
// For better readability, prefer async/await syntax.
