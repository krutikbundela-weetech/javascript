var n = 2;
function square(num) {
    var ans = num * num;
    return ans;
}
var square2 = square(n);
var square4 = square(4);

/**
 * * Execution Context will be created in 2 phases:
 * * 1. Creation Phase (Memory Creation Phase):
 * * 2. Execution Phase (Code Execution Phase):
 * 
 * * ? Creation Phase:
 * * * 1. Memory Creation Phase:
 * * * * In this phase, the JS engine creates a global execution context.
 * from top to bottom it will take variables and functions and create a memory space for them.
 * for variable it will be store undefined! n: undefined and for function it will be like square: function() {}. (IT WILL STORE THE FUNCTION WHOLE BODY)
 * 
 * ! Memory => n: undefined, square: function() {}, square2: undefined, square4: undefined
 * 
 * * * * 2. Code Execution Phase:
 * * * * * In this phase, the JS engine executes the code line by line.
 * It will execute the code in the order it is written.
 * It will execute the code line by line and update the memory space accordingly.
 *  For example, it will execute the line `n = 2;` and update the memory space to `n: 2`.
 *  
 * now for square(n) it will create a new execution context for the function call. inside the main execution context that will be called as function execution context.
 * there again the execution will start in 2 phases.
 * 
 * after return the main execution context will be updated with the value returned by the function. square2: 4
 * 
 * for square(4) again function context will be created and the same process will be followed.
 * 
 * ? Call Stack (Execution Context Stack, program stack, control stack, runtime stack, machine stack):
 * *all these process will be stored and managed in a stack called execution context stack.
 * 
 * So stack will first have Global Execution Context, then it will have Function Execution Context for square(n),(after it's process is done it will be popped) then it will have Function Execution Context for square(4).(after it's process is done it will be popped) at last GEC will be popped.
 * 
 */