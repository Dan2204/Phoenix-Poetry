
//////////////////////////
// LOGGING VIEW JAVASCRIPT
//////////////////////////


// Variables for input error handling
let error_message = document.getElementsByClassName("comment-error");
let input_box = document.getElementsByClassName("logging-input");

// HIDE INPUT ERROR MESSAGE WHEN USER TYPES
for (let i = 0; i < input_box.length; i++) {
  input_box[i].addEventListener("keypress", hideErrors);
}

function hideErrors() {
  for (let i = 0; i < error_message.length; i++) {
      error_message[i].style.display = "none";
    }
};
