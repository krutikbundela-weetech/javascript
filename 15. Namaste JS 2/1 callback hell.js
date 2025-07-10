/**
 * Callback hell (also known as the Pyramid of Doom) is a situation in JavaScript (or other asynchronous languages) where multiple nested callbacks make the code hard to read, debug, and maintain.
 * Callback hell is a common problem in JavaScript programming, especially when dealing with asynchronous operations. It occurs when multiple nested callbacks are used, leading to code that is difficult to read, understand, and maintain. This can result in a "pyramid of doom" effect, where the code becomes deeply nested and hard to follow.

🔁 What is a Callback?
A callback is a function passed as an argument to another function, to be executed later — usually after some asynchronous operation completes (like a file read, network request, or timer).

🔥 What is Callback Hell?
It happens when you nest multiple asynchronous callbacks inside each other, like this:

javascript
Copy
Edit
doSomething(function (err, result1) {
  if (!err) {
    doSomethingElse(result1, function (err, result2) {
      if (!err) {
        doAnotherThing(result2, function (err, result3) {
          if (!err) {
            // and so on...
          }
        });
      }
    });
  }
});
This code:

Grows horizontally and deeply to the right

Becomes hard to read, understand, and debug

Is difficult to handle errors properly

💡 Why Does It Happen?
Because JavaScript is single-threaded, and uses asynchronous programming (like setTimeout, fetch, fs.readFile, etc.) to avoid blocking. Callback functions are used to handle results once async operations are done.

✅ How to Avoid Callback Hell?
Modularize: Break nested callbacks into named functions.

Promises:

javascript
Copy
Edit
doSomething()
  .then(result1 => doSomethingElse(result1))
  .then(result2 => doAnotherThing(result2))
  .catch(error => console.error(error));
Async/Await:

javascript
Copy
Edit
async function run() {
  try {
    const result1 = await doSomething();
    const result2 = await doSomethingElse(result1);
    const result3 = await doAnotherThing(result2);
  } catch (error) {
    console.error(error);
  }
}
🔚 Summary:
Callback Hell is deeply nested callbacks caused by handling async logic, which leads to unreadable and unmanageable code. It’s best avoided using Promises, async/await, or by breaking logic into smaller functions.


 * ! Inversion of Control:
 * Inversion of Control (IoC) is a design principle in which the control flow of a program is inverted, meaning that the framework or runtime controls the flow instead of the application code. This allows for more flexible and modular code, as well as easier testing and maintenance.
 * !problem:
 * 
 * api.createOrder(cart, function (err, order) {
  api.processPayment(order, function (err, payment) {
    api.sendConfirmationEmail(order, function (err, email) {
      if (err) {
        console.error("Error sending confirmation email:", err);
      } else {
        console.log("Order processed successfully:", order);
      }
    });
  });
});

 * here what if on the first place the createOrder fails, then the rest of the code will not execute, and we will not be able to handle the error properly. 
 *
 */

