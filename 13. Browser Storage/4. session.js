// sessionStorage is another client-side storage API in JavaScript, similar to localStorage, but with a key difference: data stored in sessionStorage is available only for the duration of the page session. Once the browser tab or window is closed, the data is cleared.

// Basic Features
// Scope: Limited to the tab or window where it is created.
// Storage Limit: Similar to localStorage, typically around 5MB per domain.
// Data Persistence: Data exists only while the tab/window is open. Closing the tab/window clears the data.
// Basic Methods
// The sessionStorage object provides the same methods as localStorage:

// setItem(key, value): Adds a key-value pair.
// getItem(key): Retrieves the value associated with a key.
// removeItem(key): Removes a specific key-value pair.
// clear(): Clears all key-value pairs.
// key(index): Retrieves the key at a specific index.
// length: A property that returns the number of items stored.
// Usage Examples
// 1. Storing Data
// javascript
// Copy code
// // Add data to sessionStorage
// sessionStorage.setItem('user', 'Alice');
// sessionStorage.setItem('theme', 'light');
// console.log('Data stored in sessionStorage.');
// 2. Retrieving Data
// javascript
// Copy code
// // Retrieve data from sessionStorage
// const user = sessionStorage.getItem('user');
// console.log(`Welcome, ${user}!`); // Output: Welcome, Alice!
// 3. Removing Data
// javascript
// Copy code
// // Remove specific item
// sessionStorage.removeItem('user');
// console.log('User removed from sessionStorage.');
// 4. Clearing All Data
// javascript
// Copy code
// // Clear all data
// sessionStorage.clear();
// console.log('All sessionStorage data cleared.');
// 5. Iterating Over sessionStorage
// javascript
// Copy code
// // Get all keys and values in sessionStorage
// for (let i = 0; i < sessionStorage.length; i++) {
//   const key = sessionStorage.key(i);
//   const value = sessionStorage.getItem(key);
//   console.log(`${key}: ${value}`);
// }
// Working with Objects
// Like localStorage, sessionStorage only supports string values. Use JSON.stringify() and JSON.parse() for storing and retrieving objects.

// Storing an Object:
// javascript
// Copy code
// const sessionData = { name: 'Bob', preferences: { language: 'English' } };
// sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
// console.log('Object stored in sessionStorage.');
// Retrieving and Parsing an Object:
// javascript
// Copy code
// const storedSessionData = JSON.parse(sessionStorage.getItem('sessionData'));
// console.log(storedSessionData.name); // Output: Bob
// console.log(storedSessionData.preferences.language); // Output: English
// Differences Between localStorage and sessionStorage
// Feature	localStorage	sessionStorage
// Persistence	Data persists until explicitly removed	Data persists until tab/window is closed
// Scope	Shared across all tabs/windows	Limited to the current tab/window
// Use Cases	Long-term data storage (e.g., preferences, tokens)	Short-term data storage (e.g., form inputs, session-specific settings)
// Use Cases
// Session-Specific Data: Save data that is only relevant for the current session, such as temporary user settings.
// E-commerce: Store items in a cart temporarily while the user shops.
// Form Data: Persist data temporarily in case the page is accidentally refreshed.
// Limitations
// Limited Storage Size: Around 5MB, similar to localStorage.
// Not Secure: Vulnerable to XSS attacks, so avoid storing sensitive information.
// Example: Using sessionStorage in an Application
// javascript
// Copy code
// // Save form data to sessionStorage
// document.querySelector('#saveForm').addEventListener('click', () => {
//   const name = document.querySelector('#name').value;
//   sessionStorage.setItem('formName', name);
//   alert('Form data saved to sessionStorage.');
// });

// // Retrieve and display form data on page load
// document.addEventListener('DOMContentLoaded', () => {
//   const savedName = sessionStorage.getItem('formName');
//   if (savedName) {
//     document.querySelector('#name').value = savedName;
//     console.log('Form data restored from sessionStorage.');
//   }
// });
// This simple example shows how you can use sessionStorage to improve the user experience.