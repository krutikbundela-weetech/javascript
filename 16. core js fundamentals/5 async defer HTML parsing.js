/**
async and defer are attributes used in HTML <script> tags to control how and when JavaScript files are loaded and executed. They help improve page performance and load behavior.

✅ Default behavior (no async or defer)
html
Copy
Edit
<script src="script.js"></script>
The browser stops parsing HTML, downloads script.js, waits for it to load, executes it, then resumes HTML parsing.

Blocking behavior: slows down page rendering.

⚡ async
html
Copy
Edit
<script src="script.js" async></script>
- The script is downloaded **asynchronously** (without blocking HTML parsing).
- But it is **executed as soon as it's downloaded**, which **may interrupt HTML parsing**.
- **Use when the script is independent** and doesn’t rely on DOM or other scripts.

✅ Good for:
```html
<script src="analytics.js" async></script>
🕗 defer
html
Copy
Edit
<script src="script.js" defer></script>
- The script is downloaded **asynchronously**.
- Execution is **deferred until HTML parsing is complete**.
- **Executes in order** if there are multiple `defer` scripts.

✅ Use when:
- Script depends on the DOM being ready.
- You want **non-blocking but ordered** execution.

```html
<script src="lib.js" defer></script>
<script src="main.js" defer></script>
🧠 Summary
Attribute	Download	Execution	Blocks HTML Parsing	Order
none	Sync	Immediately	✅ Yes	In order
async	Async	As soon as ready	❌ No (but may interrupt)	❌ Not guaranteed
defer	Async	After HTML parsed	❌ No	✅ Guaranteed

 */