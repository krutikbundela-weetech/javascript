/**
 *  
 * !Promises:
 * Promises are a way to handle asynchronous operations in JavaScript, allowing you to write cleaner and more manageable code compared to callback hell. They represent a value that may be available now, or in the future, or never.
 * A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
 * 🔧 Why Promises?
They solve problems caused by callback hell, like:

Deep nesting

Poor error handling

Loss of readability
 *
 *
 * 
 * * A Promise can be in one of three states:
 * * 1. Pending: The initial state, neither fulfilled nor rejected.
 * * 2. Fulfilled: The operation completed successfully, and the promise has a value.
 * * 3. Rejected: The operation failed, and the promise has a reason for the failure (an error).
 * * Promises allow you to chain operations using `.then()` for success and `.catch()` for errors, making the code more readable and easier to maintain.
 * 
 * 
 * 🔍 Syntax
 * 
 */
const promise = new Promise((resolve, reject) => {
  // async work
  if (success) {
    resolve(result); // fulfilled
  } else {
    reject(error); // rejected
  }
});

//  * ✅ Using Promises:

// 1. Basic Usage
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data received!");
    }, 1000);
  });
};

fetchData()
  .then((data) => {
    console.log(data); // "Data received!"
  })
  .catch((error) => {
    console.error(error);
  });

// 2. Chaining Promises
doStep1()
  .then((result1) => doStep2(result1))
  .then((result2) => doStep3(result2))
  .then((result3) => {
    console.log("All done:", result3);
  })
  .catch((err) => {
    console.error("Error occurred:", err);
  });

//=============================================================

const cart = ["item1", "item2", "item3"];

createOrder(cart)
  .then((orderId) => {
    console.log(" 2 Promises.js:68 ~ .then ~ orderId:", orderId);
    return orderId;
  })
  .then((orderId) => {
    return processPayment(orderId);
  })
  .then((paymentId) => {
    return sendConfirmationEmail(paymentId);
  })
  .then(() => {
    console.log("Order processed successfully");
  })
  .catch((error) => {
    console.error("Error processing order:", error);
  });

const createOrder = (cart) => {
  return new Promise((resolve, reject) => {
    // Simulate order creation
    setTimeout(() => {
      if (validateCart(cart)) {
        const orderId = "order123"; // Simulated order ID
        resolve(orderId);
      } else {
        reject("Cart is empty or invalid");
      }
    }, 1000);
  });
};

const processPayment = (orderId) => {
  return new Promise((resolve, reject) => {
    // Simulate payment processing
    setTimeout(() => {
      if (orderId) {
        resolve("Payment processed for order: " + orderId);
      } else {
        reject("Payment failed");
      }
    }, 1000);
  });
};

const validateCart = (cart) => {
  return new Promise((resolve, reject) => {
    // Simulate cart validation
    setTimeout(() => {
      if (cart && cart.length > 0) {
        resolve("Cart is valid");
      } else {
        const err = new Error("Cart is empty or invalid");
        reject(err);
      }
    }, 1000);
  });
};

// here in above case there is only 1 catch block at the end of the chain, which will catch any error that occurs in any of the previous steps. This is a key advantage of using Promises over callbacks, as it avoids the need for multiple nested error handling blocks.
// but what if we want to handle errors at each step separately? We can do that too:
// or i want that even if any promise fails, the next promise should be executed, we can do that too:

createOrder(cart)
  .then((orderId) => {
    console.log(" 2 Promises.js:68 ~ .then ~ orderId:", orderId);
    return orderId;
  })
  .catch((error) => {
    console.error(error);
  })
  .then((orderId) => {
    return processPayment(orderId);
  })
  .then((paymentId) => {
    return sendConfirmationEmail(paymentId);
  })
  .then(() => {
    console.log("Order processed successfully");
  })
  .catch((error) => {
    console.error("Error processing order:", error);
  });


//   in above case, if createOrder fails, the error will be caught and logged, but the next promise (processPayment) will still be executed. This is because we have a catch block after the first then block, which will catch any error that occurs in the previous steps and log it, but will not stop the execution of the next steps.




// 4. Promise Utility Methods
// Method	Description
// Promise.all()    Waits for all promises to resolve (or any to reject).
// Promise.race()	Resolves/rejects as soon as the first one does.
// Promise.allSettled()	Waits for all to complete, regardless of outcome.
// Promise.any()	Resolves when any promise resolves (ignores rejections unless all fail).
