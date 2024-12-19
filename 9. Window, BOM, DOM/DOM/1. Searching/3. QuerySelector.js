// The querySelector method in JavaScript is a versatile and powerful way to select elements in the DOM. It is part of the Document and Element interfaces and allows you to retrieve the first element in the DOM that matches a specified CSS selector.

// Syntax
// javascript
// Copy code
// let element = document.querySelector(selectors);
// selectors: A string containing one or more CSS selectors to match the element(s).
// Return Value
// The first matching element in the DOM that matches the CSS selector(s).
// If no match is found, it returns null.
// How to Use querySelector
// 1. Select by ID
// You can use the # symbol to select an element by its ID.

// javascript
// Copy code
// const element = document.querySelector('#myId');
// console.log(element);
// 2. Select by Class
// Use the . symbol to select elements by class. querySelector returns only the first matching element.

// javascript
// Copy code
// const element = document.querySelector('.myClass');
// console.log(element);
// 3. Select by Tag Name
// You can directly use the tag name to select the first matching element.

// javascript
// Copy code
// const element = document.querySelector('p'); // Selects the first <p> element
// console.log(element);
// 4. Select by Attribute
// Use attribute selectors to select elements with specific attributes.

// javascript
// Copy code
// const element = document.querySelector('[type="text"]'); // Selects the first input with type="text"
// console.log(element);
// 5. Select Descendant Elements
// You can use combinators to select nested elements (e.g., descendants).

// javascript
// Copy code
// const element = document.querySelector('div .child-class'); // Selects the first element with class "child-class" inside a <div>
// console.log(element);
// 6. Select Pseudo-classes
// You can also use pseudo-classes like :hover, :nth-child(), etc.

// javascript
// Copy code
// const element = document.querySelector('ul li:first-child'); // Selects the first <li> in a <ul>
// console.log(element);
// Difference Between querySelector and Other Methods
// Method	Description
// querySelector	Returns the first matching element for a CSS selector.
// querySelectorAll	Returns a NodeList of all matching elements for a CSS selector.
// getElementById	Returns an element by its ID. Faster but limited to ID-based selection.
// getElementsByClassName	Returns a live HTMLCollection of elements with a specific class name.
// getElementsByTagName	Returns a live HTMLCollection of elements with a specific tag name.
// Examples
// Example 1: Selecting Elements
// HTML:
// html
// Copy code
// <div id="container">
//   <p class="text">Hello</p>
//   <p class="text">World</p>
// </div>
// JavaScript:
// javascript
// Copy code
// const firstParagraph = document.querySelector('.text'); // Selects the first <p> with class "text"
// console.log(firstParagraph.textContent); // Output: "Hello"
// Example 2: Combining Selectors
// HTML:
// html
// Copy code
// <div id="container">
//   <button class="btn primary">Click Me</button>
//   <button class="btn secondary">Don't Click Me</button>
// </div>
// JavaScript:
// javascript
// Copy code
// const primaryButton = document.querySelector('.btn.primary'); // Selects the button with both "btn" and "primary" classes
// console.log(primaryButton.textContent); // Output: "Click Me"
// Example 3: Attribute Selection
// HTML:
// html
// Copy code
// <input type="text" name="username" />
// <input type="password" name="password" />
// JavaScript:
// javascript
// Copy code
// const textInput = document.querySelector('input[type="text"]'); // Selects the input with type="text"
// console.log(textInput.name); // Output: "username"
// Example 4: No Match Found
// If no elements match the selector, querySelector returns null.

// JavaScript:
// javascript
// Copy code
// const nonexistentElement = document.querySelector('.does-not-exist');
// console.log(nonexistentElement); // Output: null
// Performance Tips
// If you need to select multiple elements, use querySelectorAll instead of running querySelector multiple times.
// For static selections by ID, prefer getElementById for better performance.
// Use specific selectors (e.g., #id, .class) to avoid unnecessary DOM traversal.
// Browser Compatibility
// querySelector is supported in all modern browsers, including:

// Google Chrome
// Mozilla Firefox
// Safari
// Edge
// Internet Explorer 8+
// Conclusion
// The querySelector method is a flexible and efficient way to select elements in the DOM using CSS selectors. It's especially useful for selecting the first match of a complex or nested selector.

// Let me know if you want further details or examples! 😊