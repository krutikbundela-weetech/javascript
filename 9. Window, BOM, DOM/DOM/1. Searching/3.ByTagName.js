// The getElementsByTagName method in JavaScript is used to select all elements in the DOM with a specific tag name. It returns a live HTMLCollection of matching elements.

// Syntax
// javascript
// Copy code
// let elements = document.getElementsByTagName(tagName);
// Parameters:
// tagName: A string representing the name of the tag you want to select (e.g., 'div', 'p', 'span', etc.).
// Use '*' as the parameter to select all elements in the DOM.
// Return Value:
// A live HTMLCollection of elements with the specified tag name.
// If no matching elements are found, it returns an empty HTMLCollection.
// Key Features
// Live Collection:

// The returned HTMLCollection is live, meaning it updates automatically if elements matching the tag name are added or removed from the DOM.
// Case Sensitivity:

// The tag name is case-insensitive for HTML documents. For XML documents, it is case-sensitive.
// How to Use getElementsByTagName
// 1. Select Elements by Tag Name
// HTML:
// html
// Copy code
// <div>Div 1</div>
// <div>Div 2</div>
// <div>Div 3</div>
// JavaScript:
// javascript
// Copy code
// const divs = document.getElementsByTagName('div');
// console.log(divs); // Outputs an HTMLCollection of all <div> elements
// 2. Access Elements from the HTMLCollection
// You can access individual elements in the collection using an index (like an array) or iterate over the collection.

// HTML:
// html
// Copy code
// <p>Paragraph 1</p>
// <p>Paragraph 2</p>
// <p>Paragraph 3</p>
// JavaScript:
// javascript
// Copy code
// const paragraphs = document.getElementsByTagName('p');

// // Access by index
// console.log(paragraphs[0].textContent); // Output: "Paragraph 1"

// // Loop through the collection
// for (let i = 0; i < paragraphs.length; i++) {
//   console.log(paragraphs[i].textContent); // Outputs all paragraph texts
// }
// 3. Select All Elements in the DOM
// HTML:
// html
// Copy code
// <div>Div Element</div>
// <p>Paragraph Element</p>
// <span>Span Element</span>
// JavaScript:
// javascript
// Copy code
// const allElements = document.getElementsByTagName('*');
// console.log(allElements); // Outputs an HTMLCollection of all elements
// 4. Modify Matching Elements
// HTML:
// html
// Copy code
// <li>Item 1</li>
// <li>Item 2</li>
// <li>Item 3</li>
// JavaScript:
// javascript
// Copy code
// const listItems = document.getElementsByTagName('li');

// // Change the text content of each <li> element
// for (const item of listItems) {
//   item.textContent += ' (Updated)';
// }
// 5. React to DOM Changes
// Since getElementsByTagName returns a live collection, it reflects changes to the DOM automatically.

// HTML:
// html
// Copy code
// <ul id="list">
//   <li>List Item 1</li>
// </ul>
// <button id="addItem">Add Item</button>
// JavaScript:
// javascript
// Copy code
// const listItems = document.getElementsByTagName('li');
// const button = document.getElementById('addItem');

// // Add a new list item on button click
// button.addEventListener('click', () => {
//   const newItem = document.createElement('li');
//   newItem.textContent = `List Item ${listItems.length + 1}`;
//   document.getElementById('list').appendChild(newItem);

//   console.log(listItems.length); // Automatically updates
// });
// Differences Between getElementsByTagName and Other Methods
// Method	Description
// getElementsByTagName	Selects all elements with a specific tag name. Returns a live HTMLCollection.
// querySelectorAll	Selects all elements matching a CSS selector. Returns a static NodeList.
// getElementById	Selects an element by its unique ID. Returns a single element or null.
// getElementsByClassName	Selects all elements with a specific class name. Returns a live HTMLCollection.
// Limitations
// No CSS Selectors:

// getElementsByTagName only matches tag names. It cannot use CSS selectors like :nth-child or div > p.
// Live Collection:

// The returned collection updates automatically with changes to the DOM. This can sometimes lead to unexpected behavior if elements are added or removed dynamically.
// Real-World Example
// HTML:
// html
// Copy code
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Example</title>
// </head>
// <body>
//   <h1>Title</h1>
//   <p>Paragraph 1</p>
//   <p>Paragraph 2</p>
//   <button id="update">Update Paragraphs</button>
// </body>
// </html>
// JavaScript:
// javascript
// Copy code
// const paragraphs = document.getElementsByTagName('p');
// const button = document.getElementById('update');

// button.addEventListener('click', () => {
//   for (let i = 0; i < paragraphs.length; i++) {
//     paragraphs[i].textContent += ' (Updated)';
//   }
// });
// Explanation:

// The getElementsByTagName method retrieves all <p> elements.
// When the button is clicked, the text content of all <p> elements is updated.
// Browser Compatibility
// The getElementsByTagName method is supported in all major browsers, including:

// Google Chrome
// Mozilla Firefox
// Safari
// Edge
// Internet Explorer 6+
// Conclusion
// The getElementsByTagName method is a straightforward way to select elements by their tag name. While it is powerful for selecting large groups of elements, you may need other methods like querySelectorAll for more precise or complex selections.

// Let me know if you'd like further clarification or examples! 😊