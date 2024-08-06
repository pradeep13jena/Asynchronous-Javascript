const message = document.getElementById("message");
const myButton = document.getElementById("myButton");
message.style.display = "none";

function fetchAPI() {
  // Fetch data from API
  fetch("https://dummyjson.com/quotes")
    // Check if the response is ok
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API error:  Status: ${response.status}`);
      } else {
        // If data returned is successfull
        // Parse the JSON data
        return response.json();
      }
    })
    // Initializing a for loop so that each data can be inserted into the div
    .then((data) => {
      message.innerText = "";
      for (let i = 0; i < data.quotes.length; i++) {
        //Initializing the number of paragraph element
        let p = document.createElement("p");
        p.innerHTML = `${data.quotes[i].id}) <q>${data.quotes[i].quote}</q> <blockquote>~${data.quotes[i].author}</blockquote> </br>`;
        //Appending all the paragraph element created into divs
        message.appendChild(p);
      }
    })
    // Handling errors and timeouts
    .catch((error) => {
      if (error.message.startsWith("API error")) {
        message.innerHTML = `${error.message}`;
      } else {
        message.innerHTML = `Network error: ${error.message}`;
      }
    });
}

function fetchData() {
  message.style.display = "block";

  message.innerText = "Callback will be executed after 5 seconds";
  // Display "Callback executed after 5 seconds" while data is being fetched
  // Set a timeout function that will click after 5 seconds and will display data
  setTimeout(fetchAPI, 5000);
}

// Event listener for the button click for Callbacks
myButton.addEventListener("click", fetchData);
