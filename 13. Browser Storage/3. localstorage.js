// The localStorage API in JavaScript allows you to store key-value pairs in a web browser persistently. Data stored in localStorage doesn't expire, meaning it remains available even after the user closes the browser.

// Here’s a guide to using localStorage effectively:

// Basic Methods
// The localStorage object provides several methods for interacting with the storage:

// setItem(key, value): Adds a key-value pair to localStorage.
// getItem(key): Retrieves the value associated with a key.
// removeItem(key): Removes the key-value pair for the specified key.
// clear(): Clears all key-value pairs in localStorage.
// key(index): Retrieves the key at a specific index.
// length: A property that returns the number of items stored.
// Usage Examples
// 1. Storing Data
// javascript
// Copy code
// // Add data to localStorage
// localStorage.setItem('username', 'JohnDoe');
// localStorage.setItem('theme', 'dark');
// console.log('Data stored successfully.');
// 2. Retrieving Data
// javascript
// Copy code
// // Retrieve data from localStorage
// const username = localStorage.getItem('username');
// console.log(`Hello, ${username}!`); // Output: Hello, JohnDoe!
// 3. Removing Data
// javascript
// Copy code
// // Remove specific item
// localStorage.removeItem('username');
// console.log('Username removed.');
// 4. Clearing All Data
// javascript
// Copy code
// // Clear all data
// localStorage.clear();
// console.log('All localStorage data cleared.');
// 5. Iterating Over localStorage
// javascript
// Copy code
// // Get all keys and values in localStorage
// for (let i = 0; i < localStorage.length; i++) {
//   const key = localStorage.key(i);
//   const value = localStorage.getItem(key);
//   console.log(`${key}: ${value}`);
// }
// Working with Objects
// Since localStorage only supports string values, you need to use JSON.stringify() to store objects and JSON.parse() to retrieve them as objects.

// Storing an Object:
// javascript
// Copy code
// const user = { name: 'Jane', age: 30, preferences: { theme: 'light' } };
// localStorage.setItem('user', JSON.stringify(user));
// console.log('Object stored successfully.');
// Retrieving and Parsing an Object:
// javascript
// Copy code
// const storedUser = JSON.parse(localStorage.getItem('user'));
// console.log(storedUser.name); // Output: Jane
// console.log(storedUser.preferences.theme); // Output: light
// Use Cases
// User Preferences: Save theme settings (e.g., light/dark mode).
// Session Management: Store tokens or session data (with care for security).
// Offline Applications: Save data for offline usage.
// Limitations
// Storage Size: Most browsers allow up to 5MB of data per domain.
// Synchronous API: Operations on localStorage are synchronous and can block the main thread for large data sets.
// Security Concerns:
// Data stored in localStorage is accessible via JavaScript, making it vulnerable to XSS attacks. Avoid storing sensitive data (e.g., passwords, tokens) in localStorage.
// Alternatives
// sessionStorage: Similar to localStorage, but data is cleared when the browser or tab is closed.
// IndexedDB/WebSQL: For more complex storage needs.
// With these capabilities, localStorage is a simple yet powerful tool for client-side storage in web applications!