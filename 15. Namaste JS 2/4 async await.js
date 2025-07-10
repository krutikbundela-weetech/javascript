//! what is async?
// async is a keyword that allows you to write asynchronous code in a more readable way.
// It allows you to write code that looks synchronous, but is actually asynchronous.
// It is used to define a function that returns a promise.
// It is used to define a function that can use the await keyword.
//* always returns a promise

async function fetchData() {
  return "Data fetched";
}
// The above function is an async function that returns a promise.
const dataPromise = fetchData();
console.log(dataPromise); // Promise { 'Data fetched' }

dataPromise.then((data) => {
  console.log(data); // Data fetched
});

//! what if we return a promise?
async function fetchDataWithPromise1() {
  return Promise.resolve("Data fetched with promise");
}
const dataPromiseWithPromise = fetchDataWithPromise1();
console.log(dataPromiseWithPromise); // Promise { 'Data fetched with promise' }

dataPromiseWithPromise.then((data) => {
  console.log(data); // Data fetched with promise
});

// if the return value is a promise, the async function will return that promise
// if the return value is not a promise, the async function will return a promise that resolves
// to that value

// ! what is await?
// await is a keyword that can only be used inside an async function.
// It is used to wait for a promise to resolve or reject.
async function fetchDataWithAwait() {
  const data = await fetchData(); // waits for the promise to resolve
  console.log(data); // Data fetched
}
fetchDataWithAwait();


// ! Promise vs async await
// Promise is a way to handle asynchronous operations in JavaScript.
// async/await is a syntax that makes working with promises easier and more readable.
// async/await is built on top of promises, so you can use them together.

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 10000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 5000);
});

async function fetchDataWithAsyncAndAwait() {
  try {
    console.log("This will be printed before the promise is resolved");
    const data = await p1; // waits for the promise to resolve
    console.log("This will be printed after the promise is resolved");
    console.log(data); // Promise resolved
   
    const data2 = await p2; // waits for the promise to resolve
    console.log("This will be printed after the promise is resolved");
    console.log(data2); // Promise resolved

    //after 10 seconds all of this is printed because p1 is first promise and it takes 10 seconds to resolve

    //if p1 is 5 seconds then it will print the first 3 lines after 5 seconds and then the last 2 lines after 10 seconds
    // and it's not total 15 seconds, it's just 10 seconds!!
  } catch (error) {
    console.error(error);
  }
}   
fetchDataWithPromiseAndAwait();

function fetchDataWithPromise() {
    p.then((data) => {
        console.log(data); // Promise resolved
        console.log("This will be printed after the promise is resolved");
    }).catch((error) => {
        console.error(error);
    });
    console.log("This will be printed before the promise is resolved");
}
fetchDataWithPromise();


// !4.1 promise issue 
//suppose the promise will take 5 seconds to resolve,so first it will print below line and then after 5 seconds it will print the promise resolved