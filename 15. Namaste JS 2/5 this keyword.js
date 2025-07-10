// ! this keyword:
//     console.log(this); // undefined in strict mode, global object(for browsers = window, for node = global ) in non-strict mode

// this inside a function refers to the global object in non-strict mode and undefined in strict mode
// In a method, this refers to the object that the method is called on.
// In an event handler, this refers to the element that the event is bound to.
// In a constructor, this refers to the instance of the object being created.

//inside a function
"use strict"; // Enabling strict mode

function showThis() {
  console.log(this); // undefined in strict mode, global object in non-strict mode(because of this substitution)
}

// this keyword value depends on how the function is called
showThis(); // undefined in strict mode, global object in non-strict mode
window.showThis(); // global object in both strict mode and non-strict mode

// inside an object method
const obj = {
  a: 10,
  showThis: function () {
    console.log(this); // refers to the obj object
  },
  showValue: function () {
    console.log(this.a); // refers to the obj object
  },
};

obj.showThis(); // { a: 10, showThis: [Function: showThis] }
obj.showValue(); // 10

// call
const student = {
  name: "Akshay",
  printName: function () {
    console.log(this.name);
  },
};
student.printName();

const student2 = {
  name: "Deepika",
};

student.printName.call(student2); // value of this= student2

// this in arrow functions
// Arrow functions do not have their own this context. They inherit this from the surrounding lexical scope.
// This means that the value of this inside an arrow function is determined by where the arrow function is defined, not how it is called.

const arrowFunction = () => {
  console.log(this); // undefined in strict mode, global object in non-strict mode
};

const obj2 = {
  a: 20,
  arrowFunction: () => {
    console.log(this); // undefined in strict mode, global object in non-strict mode
  },
};

arrowFunction(); // undefined in strict mode, global object in non-strict mode

const obj3 = {
  a: 30,
  x: function () {
    console.log(this.a); // 30
    const arrowFunc = () => {
        //enclosing lexical environment
      console.log(this); // refers to obj3 in non-strict mode, undefined in strict mode
      // In the arrow function, this refers to the obj3 object because it inherits this from the surrounding x method.
      console.log(this.a); // 
    };
    arrowFunc();
  },
};
obj3.x(); // 30,  { a: 10, x: [Function: x] }
// In the above example, the arrow function inherits this from the surrounding x method, which refers to obj3.

// inside a dom event handler
// In a DOM event handler, this refers to the element that the event is bound to.
document.querySelector("button").addEventListener("click", function () {
  console.log(this); // refers to the button element that was clicked
});
// In the above example, when the button is clicked, this refers to the button element that was clicked.
