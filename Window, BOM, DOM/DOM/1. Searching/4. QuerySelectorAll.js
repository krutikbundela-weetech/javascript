// The querySelectorAll method in JavaScript is used to select all elements in the DOM that match a specified CSS selector. Unlike querySelector, which selects only the first matching element, querySelectorAll returns a static NodeList of all matching elements.

// Syntax
// javascript
// Copy code
// let nodeList = document.querySelectorAll(selectors);
// selectors: A string containing one or more CSS selectors to match the elements.
// Return Value
// A static NodeList of all matching elements. This NodeList does not update automatically if the DOM changes.
// If no elements match, it returns an empty NodeList.
// How to Use querySelectorAll
// 1. Select All Elements by Class
// You can use the . symbol to select all elements with a specific class.

// javascript
// Copy code
// const elements = document.querySelectorAll('.myClass');
// console.log(elements); // Outputs a NodeList of all elements with class "myClass"
// 2. Select All Elements by Tag Name
// You can select all elements of a specific tag.

// javascript
// Copy code
// const paragraphs = document.querySelectorAll('p');
// console.log(paragraphs); // Outputs a NodeList of all <p> elements
// 3. Select All Elements by Attribute
// Use attribute selectors to find all elements with specific attributes.

// javascript
// Copy code
// const inputs = document.querySelectorAll('[type="text"]');
// console.log(inputs); // Outputs a NodeList of all input elements with type="text"
// 4. Select Nested Elements
// You can combine selectors to find elements in a specific context.

// javascript
// Copy code
// const items = document.querySelectorAll('ul li'); // Selects all <li> elements inside a <ul>
// console.log(items);
// 5. Select Using Pseudo-classes
// You can use pseudo-classes like :nth-child or :last-child.

// javascript
// Copy code
// const firstItems = document.querySelectorAll('ul li:first-child'); // Selects the first <li> in every <ul>
// console.log(firstItems);
// Example: Using querySelectorAll
// HTML:
// html
// Copy code
// <div>
//   <p class="text">Paragraph 1</p>
//   <p class="text">Paragraph 2</p>
//   <p class="text">Paragraph 3</p>
// </div>
// JavaScript:
// javascript
// Copy code
// const paragraphs = document.querySelectorAll('.text'); // Select all <p> with class "text"

// paragraphs.forEach((para) => {
//   console.log(para.textContent);
// });
// // Output:
// // Paragraph 1
// // Paragraph 2
// // Paragraph 3
// Iterating Over the NodeList
// The NodeList returned by querySelectorAll can be iterated over using modern JavaScript methods like forEach, for...of, or by converting it to an array.

// 1. Using forEach
// javascript
// Copy code
// const elements = document.querySelectorAll('.myClass');
// elements.forEach((element) => {
//   console.log(element.textContent);
// });
// 2. Using for...of
// javascript
// Copy code
// for (const element of document.querySelectorAll('.myClass')) {
//   console.log(element.textContent);
// }
// 3. Converting to an Array
// javascript
// Copy code
// const elementsArray = Array.from(document.querySelectorAll('.myClass'));
// elementsArray.map((element) => console.log(element.textContent));
// Key Points to Remember
// Static NodeList:

// The querySelectorAll method returns a static NodeList, meaning the list does not update if the DOM changes after the method call.
// Example:

// javascript
// Copy code
// const items = document.querySelectorAll('.item');
// document.body.innerHTML += '<div class="item">New Item</div>';
// console.log(items.length); // Does not include "New Item"
// Empty NodeList: If no elements match, the returned NodeList will be empty but not null.

// javascript
// Copy code
// const elements = document.querySelectorAll('.nonexistent');
// console.log(elements.length); // Output: 0
// Supports Complex Selectors: You can use any valid CSS selector, including combinators and pseudo-classes.

// Differences Between querySelector and querySelectorAll
// Method	Description
// querySelector	Returns the first matching element or null if no match is found.
// querySelectorAll	Returns a static NodeList of all matching elements.
// Practical Example
// HTML:
// html
// Copy code
// <div>
//   <button class="btn">Button 1</button>
//   <button class="btn">Button 2</button>
//   <button class="btn">Button 3</button>
// </div>
// JavaScript:
// javascript
// Copy code
// const buttons = document.querySelectorAll('.btn'); // Select all buttons with class "btn"

// buttons.forEach((button, index) => {
//   button.addEventListener('click', () => {
//     console.log(`Button ${index + 1} clicked`);
//   });
// });
// Output when clicking buttons:

// Clicking Button 1: "Button 1 clicked"
// Clicking Button 2: "Button 2 clicked"
// Clicking Button 3: "Button 3 clicked"
// Browser Compatibility
// querySelectorAll is supported in all modern browsers, including:

// Google Chrome
// Mozilla Firefox
// Safari
// Edge
// Internet Explorer 8+
// Conclusion
// The querySelectorAll method is a robust way to select all elements matching a specific CSS selector. It's a great tool for applying bulk operations like adding event listeners or modifying styles. Remember to handle the static nature of the returned NodeList appropriately in dynamic DOM scenarios.