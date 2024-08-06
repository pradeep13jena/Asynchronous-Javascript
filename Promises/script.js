// Used Promise race method to handle timeout and different error

const messageForPromise = document.getElementById("message");
const btnForPromise = document.getElementById("myButton");
messageForPromise.style.display = "none";

// Function to fetch data from the dummy Json API with error handling using Promises
function fetchDataPromise() {
  messageForPromise.style.display = "block";

  // Display "Loading..." while data is being fetched
  messageForPromise.innerText = "Loading...";

  // Setting up timeout promise for handling timeout
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Operation timed out")), 5000)
  );

  // Setting up FetchApi promise for handling API request
  const FetchApi = new Promise((resolve, reject) => {
    fetch("https://dummyjson.com/users")
      // Check if the response is ok
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON data
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

  // Using Promise race function to make sure whichever promise returns first can display
  return Promise.race([FetchApi, timeoutPromise]);
}

function runIt() {
  fetchDataPromise()
    .then((data) => {
      // Create a string to display the first post's title and body
      const posts = data.users;

      messageForPromise.innerText = "";
      //Initializing a for loop so that each data can be inserted into the div
      for (let i = 0; i < posts.length; i++) {
        //Initializing the number of paragraph element
        let p = document.createElement("p");
        p.innerHTML = `<b>Id: </b> ${posts[i].id} </br> <b>Name: </b> ${posts[i].firstName} ${posts[i].lastName} </br> <b>Age: </b>${posts[i].age} </br> <b>Birthdate: </b> ${posts[i].birthDate} 
            </br> <b>Email: </b> ${posts[i].email} <hr>`;
        //Appending all the paragraph element created into divs
        messageForPromise.appendChild(p);
      }
    })
    .catch((error) => {
      // Handle fetch-related errors and timeouts
      if (error.message.startsWith("HTTP error!")) {
        messageForPromise.innerHTML = `API error: ${error.message}`;
      } else if (error.message.startsWith("Operation timed out")) {
        messageForPromise.innerHTML = `${error.message}, Please try again.`;
      } else {
        messageForPromise.innerHTML = `Network error: ${error.message}`;
      }
    });
}

// Event listener for the button click for Promises
btnForPromise.addEventListener("click", runIt);
