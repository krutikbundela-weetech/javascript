// ! Debouncing
// Debouncing is a programming technique used to limit how often a function gets executed, especially in response to events that can happen frequently or rapidly, like:
// Typing in a search box (input event)
// Window resizing
// Button clicking
// Scrolling

//✅ How Debouncing Works:
// When an event is triggered:
// A timer starts.
// If the event is triggered again before the timer ends, the timer resets.
// The function runs only after the timer completes without any new events.

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer); // reset the timer on every call
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function searchInput(e) {
  console.log("Search query:", e.target.value);
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", debounce(searchInput, 300));

// IN React js
import { useState, useEffect } from "react";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Delay in ms

    return () => clearTimeout(timer); // Cleanup on query change
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      // Simulate API call
      console.log("Searching for:", debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
