// IndexedDB is a low-level, client-side database that allows you to store and manage large amounts of structured data, including files and blobs. It is asynchronous, transactional, and designed for complex applications requiring advanced querying capabilities.

// Features of IndexedDB
// Asynchronous: Uses promises or events for non-blocking operations.
// Structured Storage: Supports objects, arrays, and key-value pairs.
// Persistent Storage: Data is stored persistently until explicitly deleted.
// Offline Support: Ideal for offline web applications.
// Transactions: Provides ACID-compliant transactions.
// High Storage Limits: Much larger storage capacity than cookies or localStorage.
// Key Concepts in IndexedDB
// Database: Contains multiple object stores.
// Object Store: Similar to a table in SQL, stores records.
// Records: Key-value pairs stored in object stores.
// Indexes: Allow efficient searching of object store records.
// Keys: Unique identifiers for records.
// Transactions: Group of operations performed atomically.
// Basic IndexedDB Workflow
// Open or create a database.
// Create object stores and indexes.
// Perform read/write operations using transactions.
// Example: Using IndexedDB
// 1. Open/Initialize a Database
// javascript
// Copy code
// const dbName = "MyDatabase";
// let db;

// const request = indexedDB.open(dbName, 1);

// // Handle database version upgrades
// request.onupgradeneeded = (event) => {
//   db = event.target.result;
//   // Create an object store
//   const store = db.createObjectStore("Users", { keyPath: "id", autoIncrement: true });
//   store.createIndex("name", "name", { unique: false });
//   store.createIndex("email", "email", { unique: true });
// };

// // Handle success and errors
// request.onsuccess = (event) => {
//   db = event.target.result;
//   console.log("Database opened successfully");
// };

// request.onerror = (event) => {
//   console.error("Database error:", event.target.error);
// };
// 2. Add Data to the Database
// javascript
// Copy code
// function addData(data) {
//   const transaction = db.transaction("Users", "readwrite");
//   const store = transaction.objectStore("Users");

//   const request = store.add(data);

//   request.onsuccess = () => {
//     console.log("Data added successfully");
//   };

//   request.onerror = (event) => {
//     console.error("Error adding data:", event.target.error);
//   };
// }

// // Example usage
// addData({ name: "John Doe", email: "john@example.com" });
// 3. Retrieve Data from the Database
// javascript
// Copy code
// function getData(key) {
//   const transaction = db.transaction("Users", "readonly");
//   const store = transaction.objectStore("Users");

//   const request = store.get(key);

//   request.onsuccess = (event) => {
//     console.log("Data retrieved:", event.target.result);
//   };

//   request.onerror = (event) => {
//     console.error("Error retrieving data:", event.target.error);
//   };
// }

// // Example usage
// getData(1); // Retrieve data with key `1`
// 4. Update Data in the Database
// javascript
// Copy code
// function updateData(data) {
//   const transaction = db.transaction("Users", "readwrite");
//   const store = transaction.objectStore("Users");

//   const request = store.put(data);

//   request.onsuccess = () => {
//     console.log("Data updated successfully");
//   };

//   request.onerror = (event) => {
//     console.error("Error updating data:", event.target.error);
//   };
// }

// // Example usage
// updateData({ id: 1, name: "Jane Doe", email: "jane@example.com" });
// 5. Delete Data from the Database
// javascript
// Copy code
// function deleteData(key) {
//   const transaction = db.transaction("Users", "readwrite");
//   const store = transaction.objectStore("Users");

//   const request = store.delete(key);

//   request.onsuccess = () => {
//     console.log("Data deleted successfully");
//   };

//   request.onerror = (event) => {
//     console.error("Error deleting data:", event.target.error);
//   };
// }

// // Example usage
// deleteData(1); // Delete data with key `1`
// 6. Retrieve All Data
// javascript
// Copy code
// function getAllData() {
//   const transaction = db.transaction("Users", "readonly");
//   const store = transaction.objectStore("Users");

//   const request = store.getAll();

//   request.onsuccess = (event) => {
//     console.log("All data:", event.target.result);
//   };

//   request.onerror = (event) => {
//     console.error("Error retrieving all data:", event.target.error);
//   };
// }

// // Example usage
// getAllData();
// Use Cases
// Storing offline data for Progressive Web Apps (PWAs).
// Caching data for offline access.
// Storing large datasets like files, images, or JSON data.
// Building advanced features like client-side search and filtering.
// Limitations
// Complexity compared to localStorage or sessionStorage.
// Limited browser support in older versions.
// Cross-origin restrictions.
// Asynchronous API can be tricky without Promises or async/await.
// Browser Support
// IndexedDB is widely supported in modern browsers like Chrome, Firefox, Edge, and Safari. Use feature detection:

// javascript
// Copy code
// if (!window.indexedDB) {
//   console.error("IndexedDB is not supported in this browser.");
// }