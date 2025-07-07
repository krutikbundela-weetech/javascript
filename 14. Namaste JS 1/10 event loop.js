/**
 * ! Event Loop:
 * The event loop is a fundamental concept in JavaScript that allows for non-blocking, asynchronous execution of code. It enables JavaScript to perform tasks like handling user interactions, making network requests, and processing timers without freezing the main thread.
 * The event loop works by continuously checking the call stack and the message queue. When the call stack is empty, it takes the first message from the queue and pushes its associated callback onto the stack for execution.
 * This process allows JavaScript to handle multiple operations concurrently, making it efficient for I/O-bound tasks while maintaining a single-threaded execution model.
 * 
 * there are 3 main components of the event loop:
 * 
 * 1. Call Stack: The call stack is where JavaScript keeps track of function calls. When a function is called, it is pushed onto the stack, and when it returns, it is popped off the stack. The call stack operates in a Last In, First Out (LIFO) manner.
 * 2. Callback Queue(task Queue): The message queue holds messages (or events) that are waiting to be processed. When an asynchronous operation completes (like a timer or a network request), its callback is added to the message queue. The event loop checks the message queue and processes these callbacks when the call stack is empty.
 * 3. Microtask Queue: The microtask queue is a special queue for tasks that need to be executed after the current task but before the next rendering phase. It is primarily used for promises and mutation observers. Microtasks have higher priority than regular tasks in the message queue, meaning they will be processed before any new tasks from the main task queue. example: Promise.resolve().then(() => console.log('Microtask executed')); , fetch().then(() => console.log('Microtask executed'));
 * 
 * 
 */
