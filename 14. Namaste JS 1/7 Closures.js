/**
 * ? Closures:Closure means that a function bind together with its lexical environment or you can say “function along with it’s lexical scope”
 * A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.
 * This means that the function can remember the environment in which it was created, allowing it to access variables from that scope even after the outer function has finished executing.
 * 
 * Few Common usage of Closures are :
Module Design Patterns
Currying
Function Like once
memoize
maintaining state in async world
setTimeouts
Iterators
Data Hiding and Encapsulation

Disadvantages of Closures:
There could be over consumption of memory because every time a closure is formed, it consumes a lot of memory.
Those closed over variables are not Garbage Collected, so it means it is accumulating a lot of memory
If not handled properly, it can lead to memory leaks.
 */