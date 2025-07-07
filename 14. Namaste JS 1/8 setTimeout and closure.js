function x() {
  for (var i = 1; i <= 10; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
  console.log("Learn");
}
x();
// Output:
// Learn    
// 11 11 11 11 11 11 11 11 11 11

// 1. We learn Closures how it is a function along with it’s lexical environment. So, even when function is taken out from it’s original scope, still it will remember it’s original scope. It’ll have access to those variables of it’s lexical scope.

// 2. JS doesn’t wait for anything. So, it will run the loop again and again 🔄.
// So, setTimeout()will store all 10 functions and JS will move on. It won’t wait for timers to expire. It’ll print “Learn” and when the timer expires, it is too late.
// Now, value of i changed because the loop was constantly running. when this callback function runs, by that time, the value of var i = 11 in memory location.

// ! using let

function x() {
  for (let i = 1; i <= 10; i++) {
    // using let here
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
  console.log("Learn");
}
x();

// !using var

function x() {
  for (var i = 1; i <= 10; i++) {
    function close(k) {
      setTimeout(function () {
        console.log(k);
      }, i * 1000);
    }
    close(i);
  }
  console.log("Learn");
}
x();