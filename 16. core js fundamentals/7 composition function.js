function add(a, b) {
  return a + b;
}
function square(value) {
  return value * value;
}

const addResult = add(2, 3);
const squareResult = square(addResult);

console.log(squareResult); // Output: 25

// The result of add(2, 3) is passed to square, which then returns 25

// composition of functions allows us to build complex operations by combining simpler ones.

function composition(fn1, fn2) {
  return function (...args) {
    return fn2(fn1(...args));
  };
}

//arrow function syntax for composition
const compositionArrow = (fn1, fn2) => (...args) => fn2(fn1(...args));

const composedFunction = composition(add, square);
console.log(composedFunction(2, 3)); // Output: 25


//now make more dynamic composition function
function dynamicComposition(...fns) {
  return function (...args) {
    return fns.reduce((acc, fn) => fn(acc), args);
  };
}

const dynamicComposedFunction = dynamicComposition(add, square);
console.log(dynamicComposedFunction(2, 3)); // Output: 25

//let's use the dynamic composition function with 5 functions
function addFive(x) {
  return x + 5;
}
function multiplyByTwo(x) {
    return x * 2;
    }
function subtractThree(x) {
    return x - 3;
}
function divideByFour(x) {
    return x / 4;
}
function squareRoot(x) {
    return Math.sqrt(x);
}
const complexComposedFunction = dynamicComposition(
  addFive,  
    multiplyByTwo,
    subtractThree,
    divideByFour,
    squareRoot
);
console.log(complexComposedFunction(10)); // Output: 2.598076211353316

//how it's working
// 1. addFive(10) => 15
// 2. multiplyByTwo(15) => 30
// 3. subtractThree(30) => 27
// 4. divideByFour(27) => 6.75
// 5. squareRoot(6.75) => 2.598076211353316
// so the final output is 2.598076211353316