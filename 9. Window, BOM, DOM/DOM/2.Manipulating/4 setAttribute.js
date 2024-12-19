// The setAttribute() method in JavaScript is used to add a new attribute to an HTML element or modify the value of an existing attribute. It allows dynamic updates to element attributes like id, class, src, href, style, and custom attributes.

// Syntax
// javascript
// Copy code
// element.setAttribute(attributeName, attributeValue);
// Parameters:
// attributeName: The name of the attribute to add or update (e.g., 'class', 'id', 'src', etc.).
// attributeValue: The value to assign to the attribute.
// Return Value
// The method does not return a value.
// Examples
// 1. Add a New Attribute
// HTML:
// html
// Copy code
// <img id="myImage" src="example.jpg" alt="Example Image">
// JavaScript:
// javascript
// Copy code
// const image = document.getElementById('myImage');
// image.setAttribute('title', 'This is an image'); // Adds a "title" attribute
// console.log(image); // <img id="myImage" src="example.jpg" alt="Example Image" title="This is an image">
// 2. Modify an Existing Attribute
// HTML:
// html
// Copy code
// <a id="myLink" href="https://example.com">Visit Example</a>
// JavaScript:
// javascript
// Copy code
// const link = document.getElementById('myLink');
// link.setAttribute('href', 'https://anotherexample.com'); // Updates the "href" attribute
// console.log(link); // <a id="myLink" href="https://anotherexample.com">Visit Example</a>
// 3. Add Custom Data Attributes
// HTML:
// html
// Copy code
// <div id="product"></div>
// JavaScript:
// javascript
// Copy code
// const product = document.getElementById('product');
// product.setAttribute('data-product-id', '12345'); // Adds a custom data attribute
// console.log(product); // <div id="product" data-product-id="12345"></div>
// 4. Set Inline Styles
// HTML:
// html
// Copy code
// <p id="text">Hello, World!</p>
// JavaScript:
// javascript
// Copy code
// const text = document.getElementById('text');
// text.setAttribute('style', 'color: blue; font-size: 20px;'); // Sets inline styles
// console.log(text); // <p id="text" style="color: blue; font-size: 20px;">Hello, World!</p>
// 5. Dynamic Attribute Updates
// HTML:
// html
// Copy code
// <img id="dynamicImage" src="image1.jpg">
// JavaScript:
// javascript
// Copy code
// const image = document.getElementById('dynamicImage');
// const toggleSrc = () => {
//   const newSrc = image.getAttribute('src') === 'image1.jpg' ? 'image2.jpg' : 'image1.jpg';
//   image.setAttribute('src', newSrc);
// };

// toggleSrc(); // Updates the "src" attribute dynamically
// Key Points About setAttribute()
// Case Sensitivity:

// Attribute names are case-insensitive for HTML but are case-sensitive for XML.
// Example: setAttribute('data-id', 'value') works, but setAttribute('DATA-ID', 'value') won't in XML.
// Overwriting:

// If the attribute already exists, setAttribute() will overwrite its value.
// Custom Attributes:

// You can add custom attributes (e.g., data-*) using this method.
// Compatibility:

// Use setAttribute() to ensure cross-browser consistency when working with attributes.
// Differences Between setAttribute() and Direct Property Access
// setAttribute()	Direct Property Access (e.g., element.id)
// Modifies the attribute.	Modifies the property of the DOM element.
// Works with standard and custom attributes.	Limited to predefined properties (e.g., id, className).
// Always uses strings for attribute values.	Handles values in their native types (e.g., boolean, number).
// Example: element.setAttribute('id', 'myId')	Example: element.id = 'myId'
// Browser Compatibility
// The setAttribute() method is supported in all modern browsers, including:

// Google Chrome
// Mozilla Firefox
// Safari
// Edge
// Internet Explorer 6+
// Real-World Use Case
// Example: Toggling a Button's Disabled State
// HTML:
// html
// Copy code
// <button id="submitButton">Submit</button>
// JavaScript:
// javascript
// Copy code
// const button = document.getElementById('submitButton');

// function toggleButtonState(disable) {
//   if (disable) {
//     button.setAttribute('disabled', 'true'); // Add "disabled" attribute
//   } else {
//     button.removeAttribute('disabled'); // Remove "disabled" attribute
//   }
// }

// toggleButtonState(true);  // Disables the button
// toggleButtonState(false); // Enables the button
// If you have further questions or need examples for a specific use case, let me know! 😊