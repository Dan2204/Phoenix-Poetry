// DASHBOARD POPUPS //

// PUBLISHED POEMS POPUPS //
{% for poem in published %}
const pub_options{{ poem.id }} = document.getElementById('pub-options-popup{{ poem.id }}');
const pub_options_text{{ poem.id }} = document.getElementById('pub-options-popup-text{{ poem.id }}');
console.log(pub_options{{ poem.id }} + ": Created")
console.log(pub_options_text{{ poem.id }} + ": Created")
{% endfor %}

{% for poem in published %}

  pub_options{{ poem.id }}.addEventListener('click', (e) => {
    console.log("Event 1 Clicked:");
    {% for id in published %}
    {% if id != poem %}
      console.log(">>>> Setting " + pub_options_text{{ id.id }} + " display to none");
      pub_options_text{{ id.id }}.style.display = "none";
    {% endif %}
    {% endfor %}

    if (pub_options_text{{ poem.id }}.style.display == "block") {
      console.log(">>>> Setting " + pub_options_text{{ poem.id }} + " display to none");
      pub_options_text{{ poem.id }}.style.display = "none";
    } else {
      console.log(">>>> Setting " + pub_options_text{{ poem.id }} + " display to block");
      pub_options_text{{ poem.id }}.style.display = "block";
    }
  });

  window.addEventListener('click', e => {
    console.log("Event 2 Clicked:");
    console.log(e);
    {% for id in published %}
    console.log(e.target.classList);
    if (e.target.classList.contains('accordion')) {
      console.log("<<<< Event2 >>>> Setting " + pub_options_text{{ poem.id }} + " display to none");
      pub_options_text{{ id.id }}.style.display = "none";
    }
    {% endfor %}
      });

{% endfor %}


// UNPUBLISHED POEMS POPUPS //
{% for poem in unpublished %}
const options{{ poem.id }} = document.getElementById('options-popup{{ poem.id }}');
const options_text{{ poem.id }} = document.getElementById('options-popup-text{{ poem.id }}');
console.log(options{{ poem.id }} + ": Created")
console.log(options_text{{ poem.id }} + ": Created")
{% endfor %}

{% for poem in unpublished %}

  options{{ poem.id }}.addEventListener('click', (e) => {
    console.log("Event 1 Clicked:");
    {% for id in unpublished %}
    {% if id != poem %}
      console.log(">>>> Setting " + options_text{{ id.id }} + " display to none");
      options_text{{ id.id }}.style.display = "none";
    {% endif %}
    {% endfor %}

    if (options_text{{ poem.id }}.style.display == "block") {
      console.log(">>>> Setting " + options_text{{ poem.id }} + " display to none");
      options_text{{ poem.id }}.style.display = "none";
    } else {
      console.log(">>>> Setting " + options_text{{ poem.id }} + " display to block");
      options_text{{ poem.id }}.style.display = "block";
    }
  });

  window.addEventListener('click', e => {
    console.log("Event 2 Clicked:");
    console.log(e);
    {% for id in unpublished %}
    console.log(e.target.classList);
    if (e.target.classList.contains('accordion')) {
      console.log("<<<< Event2 >>>> Setting " + options_text{{ poem.id }} + " display to none");
      options_text{{ id.id }}.style.display = "none";
    }
    {% endfor %}
      });

{% endfor %}


// DELETED POEMS POPUPS //
{% for poem in del_poems %}
const del_poem_options{{ poem.id }} = document.getElementById('del-poem-options-popup{{ poem.id }}');
const del_poem_options_text{{ poem.id }} = document.getElementById('del-poem-options-popup-text{{ poem.id }}');
console.log(del_poem_options{{ poem.id }} + ": Created")
console.log(del_poem_options_text{{ poem.id }} + ": Created")
{% endfor %}

{% for poem in del_poems %}

  del_poem_options{{ poem.id }}.addEventListener('click', (e) => {
    console.log("Event 1 Clicked:");
    {% for id in del_poems %}
    {% if id != poem %}
      console.log(">>>> Setting " + del_poem_options_text{{ id.id }} + " display to none");
      del_poem_options_text{{ id.id }}.style.display = "none";
    {% endif %}
    {% endfor %}

    if (del_poem_options_text{{ poem.id }}.style.display == "block") {
      console.log(">>>> Setting " + del_poem_options_text{{ poem.id }} + " display to none");
      del_poem_options_text{{ poem.id }}.style.display = "none";
    } else {
      console.log(">>>> Setting " + del_poem_options_text{{ poem.id }} + " display to block");
      del_poem_options_text{{ poem.id }}.style.display = "block";
    }
  });

  window.addEventListener('click', e => {
    console.log("Event 2 Clicked:");
    console.log(e);
    {% for id in del_poems %}
    console.log(e.target.classList);
    if (e.target.classList.contains('accordion')) {
      console.log("<<<< Event2 >>>> Setting " + del_poem_options_text{{ poem.id }} + " display to none");
      del_poem_options_text{{ id.id }}.style.display = "none";
    }
    {% endfor %}
      });

{% endfor %}


// DELETED USERS POPUPS //
{% for user in del_users %}
const del_usr_options{{ user.id }} = document.getElementById('del-usr-options-popup{{ user.id }}');
const del_usr_options_text{{ user.id }} = document.getElementById('del-usr-options-popup-text{{ user.id }}');
{% endfor %}

{% for user in del_users %}

  del_usr_options{{ user.id }}.addEventListener('click', (e) => {
    console.log("Event 1 Clicked:");
    {% for id in del_users %}
    {% if id != user %}
      console.log(">>>> Setting " + del_usr_options_text{{ id.id }} + " display to none");
      del_usr_options_text{{ id.id }}.style.display = "none";
    {% endif %}
    {% endfor %}

    if (del_usr_options_text{{ user.id }}.style.display == "block") {
      console.log(">>>> Setting " + del_usr_options_text{{ user.id }} + " display to none");
      del_usr_options_text{{ user.id }}.style.display = "none";
    } else {
      console.log(">>>> Setting " + del_usr_options_text{{ user.id }} + " display to block");
      del_usr_options_text{{ user.id }}.style.display = "block";
    }
  });

  window.addEventListener('click', e => {
    console.log("Event 2 Clicked:");
    console.log(e);
    {% for id in del_users %}
    console.log(e.target.classList);
    if (e.target.classList.contains('accordion')) {
      console.log("<<<< Event2 >>>> Setting " + del_usr_options_text{{ user.id }} + " display to none");
      del_usr_options_text{{ id.id }}.style.display = "none";
    }
    {% endfor %}
      });

{% endfor %}



// DELETED COMMENTS POPUPS //
{% for comm in del_comments %}
const del_comm_options{{ comm.id }} = document.getElementById('del-comment-options-popup{{ comm.id }}');
const del_comm_options_text{{ comm.id }} = document.getElementById('del-comment-options-popup-text{{ comm.id }}');
{% endfor %}

{% for comm in del_comments %}

  del_comm_options{{ comm.id }}.addEventListener('click', (e) => {
    console.log("Event 1 Clicked:");
    {% for id in del_comments %}
    {% if id != comm %}
      console.log(">>>> Setting " + del_comm_options_text{{ id.id }} + " display to none");
      del_comm_options_text{{ id.id }}.style.display = "none";
    {% endif %}
    {% endfor %}

    if (del_comm_options_text{{ comm.id }}.style.display == "block") {
      console.log(">>>> Setting " + del_comm_options_text{{ comm.id }} + " display to none");
      del_comm_options_text{{ comm.id }}.style.display = "none";
    } else {
      console.log(">>>> Setting " + del_comm_options_text{{ comm.id }} + " display to block");
      del_comm_options_text{{ comm.id }}.style.display = "block";
    }
  });

  window.addEventListener('click', e => {
    console.log("Event 2 Clicked:");
    console.log(e);
    {% for id in del_comments %}
    console.log(e.target.classList);
    if (e.target.classList.contains('accordion')) {
      console.log("<<<< Event2 >>>> Setting " + del_comm_options_text{{ comm.id }} + " display to none");
      del_comm_options_text{{ id.id }}.style.display = "none";
    }
    {% endfor %}
      });

{% endfor %}
