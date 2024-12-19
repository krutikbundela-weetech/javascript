// Window

// 1: Window is the main container, or we can say the global Object and any operations related to entire browser window can be a part of window object.

//inspect ===> window
//inspect ===> window.navigator
//inspect ===> navigator  //no need to write window

//inspect ===> document
//inspect ===> document.body

//inspect ===> window.location
//inspect ===> window.alert("Hello")
//inspect ===> alert("Hello")

//inspect ===> window.innerWidth


// 2: All the members like objects, methods or properties. If they are the part of window object, then we do not refer the window object.

// 3:Window has methods, properties and object. ex setTimeout() or setInterval() are the methods, where as Document is the object of the Window and It also has a screen object with properties describing the physical display.


// Document

// 1: Whereas the DOM is the child of window object

// 2: Where in the DOM we need to refer the document, if we want to use the document object, methods or properties

// 3: Document is just the object of the global object that is Window, which deals with the document, the HTML elements themselves

// Window Object:
// The window object represents the global window in a browser.
// Both the Browser Object Model (BOM) and the Document Object Model (DOM) are part of the window object.

// Window Object:
// The window object represents the global window in a browser. Both the Browser Object Model (BOM) and the Document Object Model (DOM) are part of the window object.

// Browser Object Model (BOM):
// The BOM represents the browser as an object and provides methods and properties for interacting with the browser itself (not directly related to the content of a web page).

// Examples of BOM features include window.navigator for browser information, window.location for URL manipulation, and window.alert for displaying alerts.

// Window Object:
// The window object represents the global window in a browser.
// Both the Browser Object Model (BOM) and the Document Object Model (DOM) are part of the window object.

// Document Object Model (DOM):
// The DOM represents the structured document as a tree of objects, where each object corresponds to a part of the document (such as elements, attributes, and text).
// The DOM is primarily concerned with the content of the web page and allows JavaScript to interact with and manipulate the HTML elements.


// So, while the DOM is focused on the content of the page, the BOM is focused on the browser environment.
// The window object serves as the global object that encompasses both the BOM and the DOM when working in a browser environment.

// DOM Properties
// document
// getElementById(id)
// getElementsByClassName(className)
// getElementsByTagName(tagName)
// querySelector(selector)
// querySelectorAll(selector)
// innerHTML
// textContent
// style


// DOM Methods
// createElement(tagName)
// appendChild(node)
// removeChild(node)
// addEventListener(event, function)
// removeEventListener(event, function)
// setAttribute(name, value)
// getAttribute(name)
// parentNode / parentElement
// childNodes / children
// firstChild / firstElementChild
// lastChild / lastElementChild
// nextSibling / nextElementSibling
// previousSibling / previousElementSibling
// closest(selector)
// forEach (Array.from)