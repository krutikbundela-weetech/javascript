/**
 * 
 * labeled statements
ChatGPT said:
ChatGPT
In JavaScript, labeled statements allow you to give a label (identifier) to a block of code, such as loops or statements, so that you can control them using break or continue statements. Labels are particularly useful when you have nested loops or complex control structures.

Syntax
javascript
Copy code
labelName: statement
labelName is an identifier that you assign to a statement.
The labeled statement can be a loop (for, while, do-while) or a block {}.
Why Use Labeled Statements?
Labeled statements are typically used:

To break out of a specific loop in nested loops.
To continue a specific outer loop.
Using break with Labels
The break statement terminates the execution of a labeled statement, such as an outer loop.

Example 1: Breaking Out of Nested Loops
javascript
Copy code
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(`i = ${i}, j = ${j}`);
    if (i === 1 && j === 1) {
      console.log("Breaking out of outerLoop");
      break outerLoop; // Exits the labeled 'outerLoop'
    }
  }
}
console.log("Done!");
Output:
css
Copy code
i = 0, j = 0
i = 0, j = 1
i = 0, j = 2
i = 1, j = 0
i = 1, j = 1
Breaking out of outerLoop
Done!
The break outerLoop exits the outer loop, skipping all remaining iterations.
Using continue with Labels
The continue statement skips the current iteration of a labeled loop and proceeds with the next iteration.

Example 2: Skipping to the Next Iteration of a Labeled Loop
javascript
Copy code
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) {
      console.log(`Skipping i = ${i}, j = ${j}`);
      continue outerLoop; // Skips to the next iteration of 'outerLoop'
    }
    console.log(`i = ${i}, j = ${j}`);
  }
}
console.log("Done!");
Output:
css
Copy code
i = 0, j = 0
Skipping i = 0, j = 1
i = 1, j = 0
Skipping i = 1, j = 1
i = 2, j = 0
Skipping i = 2, j = 1
Done!
The continue outerLoop skips to the next iteration of the outer loop whenever j === 1.
Labeled Blocks
You can also use labels with blocks of code.

Example 3: Breaking Out of a Block
javascript
Copy code
blockLabel: {
  console.log("Start of block");
  if (true) {
    break blockLabel; // Breaks out of the block
  }
  console.log("This won't execute");
}
console.log("Block exited");
Output:
scss
Copy code
Start of block
Block exited
break blockLabel exits the labeled block early, skipping any remaining code inside the block.
Important Notes
Avoid Overuse:

Labeled statements can make code harder to read.
Use them only when absolutely necessary, such as for breaking out of nested loops.
break Without Labels:

If no label is provided, break only terminates the innermost loop or switch statement.
continue Without Labels:

Without a label, continue only affects the innermost loop.
Summary
Labeled statements give names to code blocks or loops.
They allow break and continue to control specific loops or blocks.
Syntax:
javascript
Copy code
labelName: statement;
Common Use Cases:
Breaking out of nested loops.
Continuing a specific outer loop.
 */