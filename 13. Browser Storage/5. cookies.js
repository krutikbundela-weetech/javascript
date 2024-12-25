// Cookies are small pieces of data stored in the browser and sent to the server with every HTTP request. They are used for various purposes, such as storing session information, user preferences, and tracking user activity.

// Features of Cookies
// Scope: Cookies can be scoped to a specific domain or path.
// Expiration: Cookies can have an expiration date or be session-based (deleted when the browser is closed).
// Size Limit: Each cookie is limited to around 4KB of data.
// Security: Cookies can be marked as Secure (sent only over HTTPS) and HttpOnly (inaccessible to JavaScript).
// Automatic Transmission: Cookies are sent automatically with every HTTP request to the server.
// Basic Cookie Operations in JavaScript
// 1. Setting a Cookie
// You can set cookies using document.cookie.

// javascript
// Copy code
// // Create a cookie
// document.cookie = "username=JohnDoe";
// console.log("Cookie set!");
// To set additional attributes like expiration, path, or domain:

// javascript
// Copy code
// // Set a cookie with attributes
// document.cookie = "username=JohnDoe; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/";
// 2. Getting Cookies
// The document.cookie property returns all cookies as a single string.

// javascript
// Copy code
// // Get all cookies
// console.log(document.cookie);
// // Output: "username=JohnDoe; theme=dark"
// To retrieve a specific cookie, you can parse the string:

// javascript
// Copy code
// function getCookie(name) {
//   const cookieArr = document.cookie.split("; ");
//   for (let cookie of cookieArr) {
//     const [key, value] = cookie.split("=");
//     if (key === name) {
//       return value;
//     }
//   }
//   return null;
// }

// // Example usage
// console.log(getCookie("username")); // Output: JohnDoe
// 3. Updating a Cookie
// To update a cookie, set it again with the same name but different value or attributes.

// javascript
// Copy code
// // Update a cookie
// document.cookie = "username=JaneDoe; path=/";
// console.log("Cookie updated!");
// 4. Deleting a Cookie
// To delete a cookie, set its expiration date in the past.

// javascript
// Copy code
// // Delete a cookie
// document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
// console.log("Cookie deleted!");
// Cookie Attributes
// expires: Specifies when the cookie expires (e.g., "Fri, 31 Dec 2024 23:59:59 GMT"). If not set, the cookie is a session cookie.
// max-age: Sets the lifetime of the cookie in seconds (e.g., max-age=3600).
// path: Specifies the URL path where the cookie is accessible (e.g., path=/admin).
// domain: Specifies the domain for the cookie (e.g., domain=example.com).
// Secure: Ensures the cookie is sent only over HTTPS.
// HttpOnly: Makes the cookie inaccessible to JavaScript, enhancing security.
// Use Cases of Cookies
// Session Management: Storing session identifiers.
// Personalization: Remembering user preferences like themes or language.
// Tracking and Analytics: Keeping track of user activity for analytics or ads.
// Security Considerations
// XSS Attacks: Use the HttpOnly flag to prevent JavaScript from accessing cookies.
// Secure Transmission: Use the Secure flag to ensure cookies are sent only over HTTPS.
// SameSite Attribute: Prevents cookies from being sent with cross-site requests, mitigating CSRF attacks:
// SameSite=Strict: Cookie sent only for same-site requests.
// SameSite=Lax: Cookie sent for same-site and some cross-site requests (e.g., top-level navigation).
// SameSite=None; Secure: Cookie sent for all requests but must be over HTTPS.
// Example: Storing and Retrieving a Cookie
// javascript
// Copy code
// // Set a cookie
// document.cookie = "theme=dark; max-age=3600; path=/";

// // Retrieve a specific cookie
// function getCookieValue(cookieName) {
//   const cookies = document.cookie.split("; ");
//   const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
//   return cookie ? cookie.split('=')[1] : null;
// }

// // Example usage
// console.log(getCookieValue("theme")); // Output: dark
// Modern Alternatives
// While cookies are still widely used, modern alternatives like localStorage and sessionStorage are often preferred for client-side data storage because they are easier to use and not sent automatically with every HTTP request. However, cookies remain essential for server-side session management.