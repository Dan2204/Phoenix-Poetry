//////////////////////
// NEW POEM JAVASCRIPT
//////////////////////


// Check to see if user logged in as input doesn't show otherwise
{% if current_user.is_authenticated %}

  // Variable for handling input box height
  const textarea = document.querySelector(".resize-ta");
  let std_len = 297;
  let previous_break = 0;

  // ADJUST INPUT HEIGHT WHEN USER OVER FLOWS

  // Function to calculate the new height
  function calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 0;
    if (numberOfLineBreaks > 10) {
      // std_len += 12;
      // newHeight = std_len;
      newHeight = ((std_len / 2) - 12) + numberOfLineBreaks * 20 + 12 + 2;
    } else {
      newHeight = std_len;
    }

    return newHeight;
  }

  // Set height when key has been released
  textarea.addEventListener("keyup", () => {

    textarea.style.height = calcHeight(textarea.value) + "px";
  });

{% endif %}


// Variables for input error handling
const error_message = document.getElementsByClassName("comment-error");
const input_box = document.getElementsByClassName("logging-input");

// HIDE INPUT ERROR MESSAGE WHEN USER TYPES
for (let i = 0; i < input_box.length; i++) {
  input_box[i].addEventListener("keypress", hideErrors);
}

function hideErrors() {
  for (let i = 0; i < error_message.length; i++) {
      error_message[i].style.display = "none";
    }
};
