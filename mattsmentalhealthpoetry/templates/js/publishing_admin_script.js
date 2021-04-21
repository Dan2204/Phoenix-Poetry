// DASHBOARD POPUPS //

// PUBLISHED POEMS POPUPS //
{% for poem in published %}
const pub_options{{ poem.id }} = document.getElementById('pub-options-popup{{ poem.id }}');
const pub_options_text{{ poem.id }} = document.getElementById('pub-options-popup-text{{ poem.id }}');
{% endfor %}

{% for poem in published %}

  pub_options{{ poem.id }}.addEventListener('click', (e) => {
    {% for id in published %}
    {% if id != poem %}
      pub_options_text{{ id.id }}.style.display = "none";
    {% endif %}
    {% endfor %}

    if (pub_options_text{{ poem.id }}.style.display == "block") {
      pub_options_text{{ poem.id }}.style.display = "none";
    } else {
      pub_options_text{{ poem.id }}.style.display = "block";
    }
  });

  window.addEventListener('click', e => {
    {% for id in published %}
      if (e.target.classList.contains('accordion')) {
        pub_options_text{{ id.id }}.style.display = "none";
      }
    {% endfor %}
  });

{% endfor %}


// UNPUBLISHED POEMS POPUPS //
{% for poem in unpublished %}
const options{{ poem.id }} = document.getElementById('options-popup{{ poem.id }}');
const options_text{{ poem.id }} = document.getElementById('options-popup-text{{ poem.id }}');
{% endfor %}

{% for poem in unpublished %}

  options{{ poem.id }}.addEventListener('click', (e) => {
    {% for id in unpublished %}
      {% if id != poem %}
        options_text{{ id.id }}.style.display = "none";
      {% endif %}
    {% endfor %}

    if (options_text{{ poem.id }}.style.display == "block") {
      options_text{{ poem.id }}.style.display = "none";
    } else {
      options_text{{ poem.id }}.style.display = "block";
    }
  });

  window.addEventListener('click', e => {
    {% for id in unpublished %}
      if (e.target.classList.contains('accordion')) {
        options_text{{ id.id }}.style.display = "none";
      }
    {% endfor %}
  });

{% endfor %}


// DELETED POEMS POPUPS //
{% for poem in del_poems %}
  const del_poem_options{{ poem.id }} = document.getElementById('del-poem-options-popup{{ poem.id }}');
  const del_poem_options_text{{ poem.id }} = document.getElementById('del-poem-options-popup-text{{ poem.id }}');
{% endfor %}

{% for poem in del_poems %}

  del_poem_options{{ poem.id }}.addEventListener('click', (e) => {
    {% for id in del_poems %}
      {% if id != poem %}
        del_poem_options_text{{ id.id }}.style.display = "none";
      {% endif %}
    {% endfor %}

    if (del_poem_options_text{{ poem.id }}.style.display == "block") {
      del_poem_options_text{{ poem.id }}.style.display = "none";
    } else {
      del_poem_options_text{{ poem.id }}.style.display = "block";
    }
  });

  window.addEventListener('click', e => {
    {% for id in del_poems %}
      if (e.target.classList.contains('accordion')) {
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
    {% for id in del_users %}
      {% if id != user %}
        del_usr_options_text{{ id.id }}.style.display = "none";
      {% endif %}
    {% endfor %}

    if (del_usr_options_text{{ user.id }}.style.display == "block") {
      del_usr_options_text{{ user.id }}.style.display = "none";
    } else {
      del_usr_options_text{{ user.id }}.style.display = "block";
    }
  });

  window.addEventListener('click', e => {
    {% for id in del_users %}
      if (e.target.classList.contains('accordion')) {
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
    {% for id in del_comments %}
      {% if id != comm %}
        del_comm_options_text{{ id.id }}.style.display = "none";
      {% endif %}
    {% endfor %}

    if (del_comm_options_text{{ comm.id }}.style.display == "block") {
      del_comm_options_text{{ comm.id }}.style.display = "none";
    } else {
      del_comm_options_text{{ comm.id }}.style.display = "block";
    }
  });

  window.addEventListener('click', e => {
    {% for id in del_comments %}
      if (e.target.classList.contains('accordion')) {
        del_comm_options_text{{ id.id }}.style.display = "none";
      }
    {% endfor %}
  });

{% endfor %}
