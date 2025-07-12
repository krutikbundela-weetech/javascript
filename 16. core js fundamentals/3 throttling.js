// ⚡️ What is Throttling?
// Throttling is a technique used to limit how often a function runs over time, even if the event is triggered many times.

// It ensures that a function runs at most once every X milliseconds, no matter how frequently the event occurs.

// ✅ Example Use Case:
// Window scroll events

// Mouse move events

// Button spamming

// Resize events

// 🔍 Analogy:
// Imagine you're allowed to check your phone only once every 5 minutes even if you receive multiple messages. That's throttling — you skip extra triggers but still check at regular intervals.

// 🧪 Code Example (JS):
const loggerFunc = () => {
  console.count("Throttled Function");
};

const throttle = (fn, limit) => {
  let flag = true;
  return function () {
    let context = this;
    let args = arguments;
    if (flag) {
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
};

const betterLoggerFunction = throttle(loggerFunc, 1000);

window.addEventListener("resize", betterLoggerFunction);

// This is the normal Function without Throttling
//Check the console for the difference between the calls of Normal Function and the Throttled Function
const normalFunc = () => {
  console.count("Normal Function");
};

window.addEventListener("resize", normalFunc);

// 🔁 Throttle vs Debounce
// Feature	Debounce	Throttle
// Trigger Timing	After user stops triggering for X ms	At most once every X ms
// Use Case	Search box, input validation	Scroll, resize, dragging
// Example Behavior	“Run after pause”	“Run at regular intervals, not more often”

//! Debounce vs Throttling App

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Debounce vs Throttle Demo</title>
//   <style>
//     body { font-family: sans-serif; padding: 20px; }
//     .log { margin-top: 10px; height: 100px; overflow-y: auto; background: #f0f0f0; padding: 10px; }
//     button { margin-top: 10px; }
//   </style>
// </head>
// <body>
//   <h2>Move your mouse quickly across the box below:</h2>

//   <div id="box" style="width:100%; height:200px; background:#ddd; border:1px solid #ccc;"></div>

//   <h3>Debounced Output (300ms delay after last move)</h3>
//   <div class="log" id="debounceLog"></div>

//   <h3>Throttled Output (once per 500ms)</h3>
//   <div class="log" id="throttleLog"></div>

//   <script>
//     function debounce(fn, delay) {
//       let timer;
//       return function (...args) {
//         clearTimeout(timer);
//         timer = setTimeout(() => fn.apply(this, args), delay);
//       };
//     }

//     function throttle(fn, limit) {
//       let inThrottle;
//       return function (...args) {
//         if (!inThrottle) {
//           fn.apply(this, args);
//           inThrottle = true;
//           setTimeout(() => inThrottle = false, limit);
//         }
//       };
//     }

//     const debounceLog = document.getElementById('debounceLog');
//     const throttleLog = document.getElementById('throttleLog');

//     function logDebounce(e) {
//       debounceLog.innerHTML += `Debounce: ${new Date().toLocaleTimeString()}<br>`;
//       debounceLog.scrollTop = debounceLog.scrollHeight;
//     }

//     function logThrottle(e) {
//       throttleLog.innerHTML += `Throttle: ${new Date().toLocaleTimeString()}<br>`;
//       throttleLog.scrollTop = throttleLog.scrollHeight;
//     }

//     const box = document.getElementById('box');

//     box.addEventListener('mousemove', debounce(logDebounce, 300));
//     box.addEventListener('mousemove', throttle(logThrottle, 500));
//   </script>
// </body>
// </html>
