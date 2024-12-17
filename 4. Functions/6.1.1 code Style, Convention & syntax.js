/**
 * Code Styles, Conventions & Syntax
There is a difference between writing correct code (i.e. avoiding syntax errors) and writing readable, properly formatted code.

Here's a syntax error example:

function greetUser {
  alert('Hi there!');
}
What's the problem?

This function has no parameter list (the ()), it should be:

function greetUser() {
  alert('Hi there!');
}
This course teaches you the correct syntax - it teaches you how to define functions, how to declare variables etc. But of course, I also try to write readable code.

Take this as an example:

function greetUser() {alert('Hi there!');}
This would be a valid code snippet!

Whitespace, line breaks and indentation are all totally optional! Not required!

But of course this version of the code is more readable:

function greetUser() {
  alert('Hi there!');
}
The same goes for variable definitions:

let userName='Max';
would be valid. And of course you can also read it.

But

let userName = 'Max';
is simply a bit more readable - it makes it easier to see where the variable name ends and the value starts.

So in general, whitespace, adding a line break and indentation is optional as long as you don't create syntax errors by omitting it - e.g. functiongreet(){} would be wrong since the function keyword can now no longer be identified.

You can also structure longer expressions across multiple lines to make them more readable, for example:

let someResult = 5 + 10 - 3 + 22 - 10000 + 5.344 * 1200;
could be written as:

let someResult = 5 + 10 - 3 + 
                 22 - 10000 + 5.344 * 
                 1200;
The same goes for long string concatenations:

let someLongString = 'Hi, this is going to be a bit longer, ' +
                     'so maybe split it across multiple lines by ' +
                     'concatenating multiple strings!';
This would not be valid, it would be a syntax error:

let someLongString = 'Hi, this is going to be a bit longer, 
                      so maybe split it across multiple lines by 
                      concatenating multiple strings!';
Why? Because JavaScript can't find the end of the string in the first line - and it doesn't look in the other lines. Strings always have to be in one line (or split into multiple strings, concatenated via +).

What about semi-colons?

Generally, you should place them after every expression you wrote. The exception are functions and similar code snippets where you use {} (exception from that rule: objects!).

Adding a semi-colon after a function wouldn't be a problem, you wouldn't get an error. But it's a common practice to NOT add semi-colons there.

---

Your IDE should normally highlight syntax errors right away. There also are tools & plugins that you can use that suggest certain code styles (e.g. how many whitespaces should be used for indentation) but the exact configuration of these tools and the exact rules you want to follow are of course up to you. We actually already use one plugin that helps us with code formatting - Prettier (https://github.com/prettier/prettier-vscode).

Later in the course, we'll dive into such tools ("linters" like ESLint) and of course I also follow a consistent code style which you can use throughout the course.
 */