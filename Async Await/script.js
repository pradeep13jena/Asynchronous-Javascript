// Used AbortController() object to handle timeout and different error

const messageDiv = document.getElementById("message");
const btnForAsyncAwait = document.getElementById("awaitFunctionalities");
messageDiv.style.display = "none";

// Function to fetch data from the dummy Json API with error handling using Async & Await
async function fetchDataAsync() {
  messageDiv.style.display = "block";

  // Set up an AbortController to handle timeouts
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    // Display "Loading..." while data is being fetched
    messageDiv.innerText = "Loading...";

    // Fetch data from dummyJson API
    const response = await fetch("https://dummyjson.com/posts", {
      signal: controller.signal, // Pass the AbortController signal
    });

    // Clear the timeout once the fetch is successful
    clearTimeout(timeoutId);

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      messageDiv.innerText = "";
    }

    // Parse the JSON data
    const data = await response.json();
    //Initializing a for loop so that each data can be inserted into the div
    for (let i = 0; i < data.posts.length; i++) {
      //initializing the number of paragraph element
      let p = document.createElement("p");
      p.innerHTML = `Title ${data.posts[i].id} - ${data.posts[i].title} <hr>`;
      //appending all the paragraph element created into divs
      messageDiv.appendChild(p);
    }
  } catch (error) {
    // Handle fetch-related errors and timeouts
    if (error.name === "AbortError") {
      messageDiv.textContent = "Request timed out. Please try again.";
    } else if (error.message.startsWith("HTTP error!")) {
      messageDiv.textContent = `API error: ${error.message}`;
    } else {
      messageDiv.textContent = `Network error: ${error.message}`;
    }
  }
}

// Event listener for the button click for Async & Await
btnForAsyncAwait.addEventListener("click", fetchDataAsync);
