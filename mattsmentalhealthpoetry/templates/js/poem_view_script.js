
///////////////////////
// POEM VIEW JAVASCRIPT
///////////////////////


// Check to see if user logged in as input doesn't show otherwise
{% if current_user.is_authenticated %}

  // Variables for input error handling
  let error_message = document.getElementsByClassName("comment-error");
  let input_box = document.getElementById("input-box");

  // HIDE INPUT ERROR MESSAGE WHEN USER TYPES
  input_box.addEventListener("keypress", hideErrors);

  function hideErrors() {
    for (let i = 0; i < error_message.length; i++) {
        error_message[i].style.display = "none";
    }
  };


  // ADJUST INPUT HEIGHT WHEN USER OVER FLOWS

  // Variable for handling input box height
  const textarea = document.querySelector(".resize-ta");

  // Function to calculate the new height
  function calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    return newHeight;
  }

    // Set height when key has been released
    textarea.addEventListener("keyup", () => {
      textarea.style.height = calcHeight(textarea.value) + "px";
    });

{% endif %}


// Variables for showing and hiding the comments pane
const show_tag = document.getElementById('show-hide-comments');
const comments_box = document.getElementById('comments-body');

// SHOW/HIDE COMMENTS PANE
show_tag.addEventListener('click', (e) => {
  if(comments_box.style.display === "block") {
    comments_box.style.display = "none";
  } else {
    comments_box.style.display = "block";
  }
});
