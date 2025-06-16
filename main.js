// Sample product data
/**
✅ Debounced search
✅ Linear search logic
✅ Product sorting
✅ Duplicate removal
✅ Tag frequency count
✅ Flattening nested arrays
✅ Palindrome detector for fun
✅ Dynamic UI updates */
let products = [
  { name: "Apple Watch", price: 199, tags: ["tech", ["wearable"]] },
  { name: "Banana Phone", price: 99, tags: ["fun", "tech"] },
  { name: "Mango Mouse", price: 49, tags: ["accessory", "tech"] },
  { name: "Coconut Charger", price: 25, tags: ["charger", "accessory"] },
  { name: "Banana Phone", price: 99, tags: ["fun", "tech"] },
   // Duplicate
];

// ✅ Deduplication
// Using a Map to remove duplicates based on product name
// This will keep the first occurrence of each product name
// The Map will use the product name as the key
products = [...new Map(products.map(p => [p.name, p])).values()];


// ✅ Sorting by price
// This will sort the products array in ascending order based on the price
products.sort((a, b) => a.price - b.price);

// ✅ Flatten nested tags
// This function flattens nested arrays of tags into a single array
// It uses the Array.flat method with Infinity depth to ensure all levels are flattened
function flatten(arr) {
  return arr.flat(Infinity);
}

// ✅ Frequency count (categories)
function countTags(products) {
  const tagCount = {};
  products.forEach(p => {
    flatten(p.tags).forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  console.log("Tag Frequency:", tagCount);
}
countTags(products);

// ✅ Linear search + debounce
// This function will be called when the user types in the search box
// Debounce function to limit search calls
// This prevents the function from being called too frequently

function debounce(fn, delay) {
    // This function returns a new function that delays the execution of `fn`
  let timer;
  // `timer` will hold the timeout ID for the delayed function call
  // `delay` is the time in milliseconds to wait before calling `fn`
  return function (...args) {
    // This function captures the arguments passed to it
    // and returns a new function that can be called later
    clearTimeout(timer);
    // Clear any existing timer to reset the delay
    // This ensures that the previous call is cancelled if a new one comes in
    timer = setTimeout(() => fn(...args), delay);
  };
}
// This returns a new function that will call `fn` after the specified `delay`
// The `searchProducts` function filters the products based on the search term
function searchProducts(term) {
    // This function filters the products based on the search term
    // If the term is empty, it shows all products
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(term.toLowerCase())
  );
  showProducts(filtered);
}

const debouncedSearch = debounce(searchProducts, 300);

document.getElementById("search").addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

// ✅ Palindrome detection suggestion
// This function checks if a word is a palindrome
// A palindrome reads the same forwards and backwards
function isPalindrome(word) {
  return word === word.split("").reverse().join("");
}

// ✅ Show products
function showProducts(data) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<li>No products found.</li>";
    return;
  }

  data.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${p.name}</strong> - $${p.price}`;
    list.appendChild(li);

    // Palindrome hint
    if (isPalindrome(p.name.toLowerCase().replace(/\s/g, ""))) {
      li.innerHTML += " 🔁 (Palindrome!)";
    }
  });
}

// ✅ Load initial list
showProducts(products);
