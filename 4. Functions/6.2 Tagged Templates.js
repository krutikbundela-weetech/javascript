// Tagged Templates in JavaScript
// Tagged templates are a special feature of template literals in JavaScript that allow you to process a template literal with a tag function. The tag function can manipulate the literal strings and the interpolated values before producing the final output.

// How Tagged Templates Work
// The syntax for a tagged template is:

// javascript
// Copy code
// tag`Template Literal`;
// Here:

// tag is the name of the function that processes the template literal.
// The template literal (backtick-enclosed string) is passed to the tag function.
// Tag Function
// A tag function receives:

// An array of literal strings (the static parts of the template literal).
// The values of the expressions (the interpolated variables).
// Basic Example
// javascript
// Copy code
// function myTag(strings, ...values) {
//   console.log('Strings:', strings);
//   console.log('Values:', values);
//   return 'Processed Output';
// }

// const name = 'Alice';
// const age = 30;

// const result = myTag`Hello, ${name}! You are ${age} years old.`;
// console.log(result);

// // Outputs:
// // Strings: [ 'Hello, ', '! You are ', ' years old.' ]
// // Values: [ 'Alice', 30 ]
// // Processed Output
// Key Features
// Access to Static Strings and Interpolated Values

// The strings array contains the static portions of the template.
// The values array contains the interpolated expressions.
// Custom Processing

// You can use the tag function to manipulate or validate the data.
// Practical Examples
// 1. Formatting a String
// You can use tagged templates to dynamically format output:

// javascript
// Copy code
// function formatCurrency(strings, ...values) {
//   return strings.reduce((result, str, i) => {
//     const value = values[i] ? `$${values[i].toFixed(2)}` : '';
//     return result + str + value;
//   }, '');
// }

// const price = 10;
// const tax = 2.5;

// const result = formatCurrency`Price: ${price}, Tax: ${tax}`;
// console.log(result); // Outputs: "Price: $10.00, Tax: $2.50"
// 2. Escaping HTML
// Tagged templates can be used to escape potentially unsafe HTML:

// javascript
// Copy code
// function escapeHTML(strings, ...values) {
//   const escape = str =>
//     str
//       .replace(/&/g, '&amp;')
//       .replace(/</g, '&lt;')
//       .replace(/>/g, '&gt;')
//       .replace(/"/g, '&quot;')
//       .replace(/'/g, '&#39;');

//   return strings.reduce((result, str, i) => {
//     const value = values[i] ? escape(values[i]) : '';
//     return result + str + value;
//   }, '');
// }

// const userInput = '<script>alert("hacked!")</script>';
// const safeHTML = escapeHTML`User input: ${userInput}`;
// console.log(safeHTML);
// // Outputs: "User input: &lt;script&gt;alert(&quot;hacked!&quot;)&lt;/script&gt;"
// 3. Localization
// Tagged templates can simplify localization by processing strings dynamically:

// javascript
// Copy code
// function i18n(strings, ...values) {
//   const translations = {
//     'Hello, ': 'Hola, ',
//     '! You are ': '¡Tienes ',
//     ' years old.': ' años.'
//   };

//   return strings.reduce((result, str, i) => {
//     const translatedStr = translations[str] || str;
//     return result + translatedStr + (values[i] || '');
//   }, '');
// }

// const name = 'Alice';
// const age = 30;

// const localized = i18n`Hello, ${name}! You are ${age} years old.`;
// console.log(localized); // Outputs: "Hola, Alice¡Tienes 30 años."
// Special Use Case: String.raw
// The built-in String.raw is a predefined tag function that processes template literals by preserving raw escape sequences (e.g., \n, \t).

// Example
// javascript
// Copy code
// const rawString = String.raw`This is a raw string with \n no new line`;
// console.log(rawString);
// // Outputs: "This is a raw string with \n no new line"
// Advantages of Tagged Templates
// Custom String Manipulation:

// Format, sanitize, or process strings as needed.
// Improved Security:

// Prevent injection attacks by escaping data.
// Localization:

// Simplify translation of strings dynamically.
// Summary
// Tagged templates let you use functions to process template literals.
// They provide access to both static strings and interpolated values.
// Common use cases include formatting, sanitizing, and translating text.
// Built-in tag functions like String.raw offer additional utilities.
// Let me know if you'd like to explore more examples or dive deeper! 😊