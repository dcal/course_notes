#1. Introduction

- Don't imitate. UNDERSTAND. Imitating only takes you so far. You can't move forward unless you understand the tool. Then you can recognize good code and borrow ideas rather than copy and paste.
- JS is nothing like other programming languages. It is its own beast.

#2. Setup
NADA.

#3. Big Words and Javasript
NADA.

#4. Watching this Course in High Definition
NADA.

#5. Understanding, Frameworks, and The Weird Parts
Learning a framework is not learning Javascript.

#6. Conceptual Aside
###Syntax Parsers
A program that reads your code and determines what it does and if its grammar is valid (hands off to interpreters, compilers, etc.).

###Lexical Environments
Lexical scope - where the code sits in relation to other code

###Execution Contexts
A wrapper to help manage the code that is running
This is the code that is actually running...be it code you wrote or code added by the compiler - what is the computer running?

#7. Conceptual Aside
###Name/Value Pairs and Objects
In Javascript, an Object is a collection of name/value pairs.

*This is what I've typically called a key/value pair.*

#8. Downloading Source Code
NADA

#9. The Global Environment and the Global Object
Global execution context creates:
- global object
- 'this' variable

GLOBAL = not inside a function

Running an empty javacript document in the browser the global execution context creates a global window object, and sets 'this' to that object.

---
*AHA moment...'this' is actually a global variable that gets set to the current execution context.*
---

Anything not in a function gets bound to the global object.

In this example, executing in a browser:

	var a = "hello world";

	function b() {
	};

 `a`, `this.a` and `window.a` are the same thing (the variable 'a' bound to the global object, which is called 'window' and is currently set to 'this').

#10 Execution Context: Creation and Hoisting

Functions and variables are placed into memory space during creation and hoisting of the global execution context. 
### Variables
Memory is created for a placeholder for variables (undefined). All variables are initially set to undefined. Variable values are set during the execution phase.
### Functions
Funtions, unlike variables, are placed into memory entirely.

### Example
In this example, `a` will be undefined but `b()` will work as expected. This is because the function is read in in its entirely during hoisting, but memory is merely set aside for the variables, which are undefined by default. The second `console.log(a)` is evaluated during execution, at which point the variable has been set.

    b();
    console.log(a);
    
    var a = "hello world";
    
    function b() {
        console.log("Hello, I'm b!")
    };
    
    console.log(a);

# 11: Conceptual Aside: Javascript and 'undefined'
'undefined' vs. 'not defined'
`undefined` means the variable hasn't been set. Not defined means that no memory has been set aside for any variable of that name.

`undefined` in and of itself is a value. It is a keyword.

    var a;
    console.log(a);
    
    if(a === undefined){
        console.log("a is undefined, yo!");
    } else {
        console.log("a is defined, yo!");
    }

You can set a variable = to undefined, i.e. `a = undefined`. It's better to let it mean "I never set the value for this variable."

# 12: The Execution Context - Code Execution

This section is simply demonstrating the principle discussed before.

    function b() {
        console.log("Dude, I'm b!");
    }
    
    var a;
    console.log(a);
    
    a = "I'm a, dude!";
    
    console.log(a);

produces

    "Dude, I'm b!"
    undefined
    "I'm a, dude!"

because the execution context has access to `b()`, but `a` was set to `undefined` during the creation and hoisting process.

#13: Conceptual Aside: Single-threaded, Synchronous Execution
Javascript is single-threaded and synchronous as a language. WHAAAAAT?
One command at a time, in order.

#14: Function Invocation and the Execution Stack
_BWA_: Invocation = running a function
You do this in JS by using parentesis: `()`

    function b() {
    }
    function(a){
        b();
    }
    a();

When `a()` is invoked, it creates a new execution context, and adds it to the execution stack, then running that code / context. It puts work on top of the other work to do. Once code finishes it is popped off the stack.

The lexical order of functions a and b don't matter, because they were read into memory during the create phase of the global execution context.

The same process that hapens for the global execution context is followed for execution contexts added to the stack. They are created, the memory is initialized within that context, there is a "this" variable created for them.

_*QUESTION*_: Is a new `this` variable initialized, or is the global `this` set to the current execution context?
