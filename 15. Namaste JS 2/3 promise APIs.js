/**
 * ?promise.all:
 * * `Promise.all` is a method that takes an array of promises and returns a single promise that resolves when all the promises in the array have resolved, or rejects if any of the promises reject.
 * * It is useful for running multiple asynchronous operations in parallel and waiting for all of them to complete before proceeding.
 * * If any of the promises reject, the returned promise will reject with the reason of the first rejected promise.
 */

// !3.1 when all promises resolve
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values); // [3, 42, "foo"]
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// !3.2 when one of the promises rejects`
const promise4 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "Error occurred");
});
Promise.all([promise1, promise2, promise4])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.error("Error:", error); // Error: Error occurred
  });

/**
 * !promise.allSettled:
 * * `Promise.allSettled` is a method that takes an array of promises and returns a single promise that resolves when all the promises in the array have settled (either resolved or rejected).
 * * It returns an array of objects, each representing the outcome of each promise, with `status` and `value` (or `reason` for rejections).
 * * It is useful when you want to wait for all promises to complete, regardless of whether they resolve or reject, and you want to know the outcome of each promise.
 * * Unlike `Promise.all`, it does not short-circuit on the first rejection,
 * so it will always return an array with the results of all promises, even if some of them failed.
 */

// !3.3 when all promises settle 
const promise5 = Promise.resolve(3);
const promise6 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "Error occurred");
});
const promise7 = new Promise((resolve) => {
  setTimeout(resolve, 100, "foo");
});
Promise.allSettled([promise5, promise6, promise7])
  .then((results) => {
    console.log(results);
    // [
    //   { status: "fulfilled", value: 3 },
    //   { status: "rejected", reason: "Error occurred" },
    //   { status: "fulfilled", value: "foo" }
    // ]
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// !3.4 when one of the promises fails
Promise.allSettled([promise1, promise2, promise4])
  .then((results) => {
    console.log(results);
    // [
    //   { status: "fulfilled", value: 3 },
    //   { status: "fulfilled", value: 42 },
    //   { status: "rejected", reason: "Error occurred" }
    // ]
  })
  .catch((error) => {
    console.error("Error:", error);
  });


  /**
   * ?promise.race:
   * * `Promise.race` is a method that takes an array of promises and returns a single promise that resolves or rejects as soon as one of the promises in the array resolves or rejects.
   * * It is useful when you want to proceed with the result of the first promise that  settles, regardless of whether it resolves or rejects.
   * * If the first promise resolves, the returned promise resolves with that value.    
   * * If the first promise rejects, the returned promise rejects with that reason.
   * * It does not wait for all promises to settle, so it can be used for scenarios where you want to take action as soon as the first promise completes.
   */

  // !3.5 when one of the promises resolves
  Promise.race([promise1, promise2, promise3])
    .then((value) => {
        console.log("First resolved value:", value); // First resolved value: 3
    })  

    // !3.6 when one of the promises rejects
Promise.race([promise1, promise2, promise4])
  .then((value) => {
    console.log("First resolved value:", value);
  })
  .catch((error) => {       
    console.error("First rejected reason:", error); // First rejected reason: Error occurred
  });

/**
 *  ?promise.any:
 * * `Promise.any` is a method that takes an array of promises and returns a single promise that resolves when any of the promises in the array resolves.
 * * If all promises reject, it rejects with an `AggregateError` containing all rejection reasons.
 * * It is useful when you want to proceed with the result of the first promise that resolves, ignoring any rejections.
 * * It is similar to `Promise.race`, but it only resolves when at least one promise resolves, and it ignores rejections unless all promises reject.
 */

// !3.7 all promises resolve
const promise1s = new Promise((resolve) => setTimeout(resolve, 1000, 3));
const promise2s = new Promise((resolve) => setTimeout(resolve, 2000, 42));
const promise3s = new Promise((resolve) => setTimeout(resolve, 3000, "foo"));

Promise.any([promise1s, promise2s, promise3s])
    .then((value) => {
        console.log("First resolved value:", value); // First resolved value: 3`
    })
    .catch((error) => {
        console.error("Error:", error);
    });


// !3.8 only last promise resolves
Promise.any([promise4,promise6,promise3s])
    .then((value) => {
        console.log("First resolved value:", value); // First resolved value: foo
    })
    .catch((error) => { 
        console.error("Error:", error);
    });

// !3.9 all promises reject
const promise5s = new Promise((_, reject) => setTimeout(reject, 1000, "Error 1"));
const promise6s = new Promise((_, reject) => setTimeout(reject, 2000, "Error 2"));
const promise7s = new Promise((_, reject) => setTimeout(reject, 3000, "Error 3"));
Promise.any([promise5s, promise6s, promise7s])  
    .then((value) => {
        console.log("First resolved value:", value);
    })
    .catch((error) => {
        console.error("All promises rejected:", error); // All promises rejected: AggregateError: All promises were rejected
    });