// The getAttribute() method in JavaScript is used to retrieve the value of a specified attribute from an HTML element. If the attribute exists, it returns the value as a string; if the attribute doesn't exist, it returns null.

// Syntax
// javascript
// Copy code
// let attributeValue = element.getAttribute(attributeName);
// Parameters:
// attributeName: A string representing the name of the attribute whose value you want to retrieve.
// Return Value:
// The value of the specified attribute as a string.
// If the attribute doesn't exist, it returns null.
// Examples
// 1. Retrieve an Existing Attribute
// HTML:
// html
// Copy code
// <img id="logo" src="logo.png" alt="Website Logo">
// JavaScript:
// javascript
// Copy code
// const image = document.getElementById('logo');
// console.log(image.getAttribute('src')); // Outputs: "logo.png"
// console.log(image.getAttribute('alt')); // Outputs: "Website Logo"
// 2. Handle Non-Existent Attributes
// HTML:
// html
// Copy code
// <button id="submitButton">Submit</button>
// JavaScript:
// javascript
// Copy code
// const button = document.getElementById('submitButton');
// console.log(button.getAttribute('disabled')); // Outputs: null (attribute does not exist)
// 3. Retrieve Custom Attributes
// HTML:
// html
// Copy code
// <div id="product" data-id="12345" data-category="electronics"></div>
// JavaScript:
// javascript
// Copy code
// const product = document.getElementById('product');
// console.log(product.getAttribute('data-id'));        // Outputs: "12345"
// console.log(product.getAttribute('data-category')); // Outputs: "electronics"
// 4. Dynamic Retrieval
// HTML:
// html
// Copy code
// <a id="myLink" href="https://example.com" target="_blank">Click Here</a>
// JavaScript:
// javascript
// Copy code
// const link = document.getElementById('myLink');

// // Check current attribute values
// console.log(link.getAttribute('href'));    // Outputs: "https://example.com"
// console.log(link.getAttribute('target')); // Outputs: "_blank"

// // Modify dynamically and retrieve again
// link.setAttribute('target', '_self');
// console.log(link.getAttribute('target')); // Outputs: "_self"
// Key Points About getAttribute()
// Case Insensitivity:

// Attribute names are case-insensitive in HTML documents but are case-sensitive in XML documents.
// Value Always Returned as String:

// Regardless of the data type (e.g., number, boolean), the method always returns the attribute value as a string.
// Standard vs. Non-Standard Attributes:

// It works for both standard attributes (e.g., id, class, src) and custom attributes (e.g., data-*).
// Comparison with Direct Property Access:

// Direct property access (element.id, element.className, etc.) retrieves the property's value from the DOM, while getAttribute() fetches the value from the attribute in the HTML markup.
// Differences Between getAttribute() and Direct Property Access
// getAttribute()	Direct Property Access (e.g., element.id)
// Retrieves the value from the HTML markup.	Retrieves the current value of the DOM property.
// Always returns a string.	Returns the property's actual value and type.
// Example: element.getAttribute('id')	Example: element.id
// Example Comparison:
// HTML:
// html
// Copy code
// <input type="checkbox" id="accept" checked>
// JavaScript:
// javascript
// Copy code
// const checkbox = document.getElementById('accept');

// // Using getAttribute()
// console.log(checkbox.getAttribute('checked')); // Outputs: "checked" (from the HTML)

// // Using property access
// console.log(checkbox.checked); // Outputs: true (actual state in DOM)
// Real-World Use Case
// Example: Retrieve and Use Data Attributes
// HTML:
// html
// Copy code
// <div class="product" data-id="001" data-name="Laptop"></div>
// JavaScript:
// javascript
// Copy code
// const product = document.querySelector('.product');

// // Fetch custom attributes
// const productId = product.getAttribute('data-id');
// const productName = product.getAttribute('data-name');

// console.log(`Product ID: ${productId}`);  // Outputs: "Product ID: 001"
// console.log(`Product Name: ${productName}`); // Outputs: "Product Name: Laptop"
// Browser Compatibility
// The getAttribute() method is supported in all major browsers, including:

// Google Chrome
// Mozilla Firefox
// Safari
// Edge
// Internet Explorer 6+
// Conclusion
// The getAttribute() method is essential for retrieving attribute values dynamically, especially when working with custom attributes or when there's a need to fetch the exact value defined in the HTML.

// If you need further clarification or examples, feel free to ask! 😊