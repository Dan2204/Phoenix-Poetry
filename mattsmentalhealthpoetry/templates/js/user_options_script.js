




// USER OPTIONS POPUPS //
{% for user in user_list %}
  {% if user.display_name != "@dan-lucas" %}
    const user_popup{{ user.id }} = document.getElementById('user-select-popup{{ user.id }}');
    const user_popup_text{{ user.id }} = document.getElementById('user-select-popup-text{{ user.id }}');
    console.log(user_popup{{ user.id }} + ": Created");
    console.log(user_popup_text{{ user.id }} + ": Created");
  {% endif %}
{% endfor %}

{% for user in user_list %}
  {% if user.display_name != "@dan-lucas" %}

    user_popup{{ user.id }}.addEventListener('click', (e) => {
      console.log("Event 1 Clicked:");
      {% for id in user_list %}
        {% if id.display_name != "@dan-lucas" %}
          {% if id != user %}
            console.log(">>>> Setting " + user_popup_text{{ id.id }} + " display to none");
            user_popup_text{{ id.id }}.style.display = "none";
          {% endif %}
        {% endif %}
      {% endfor %}

      if (user_popup_text{{ user.id }}.style.display == "block") {
        console.log(">>>> Setting " + user_popup_text{{ user.id }} + " display to none");
        user_popup_text{{ user.id }}.style.display = "none";
      } else {
        console.log(">>>> Setting " + user_popup_text{{ user.id }} + " display to block");
        user_popup_text{{ user.id }}.style.display = "block";
      }
    });

    window.addEventListener('click', e => {
      console.log("Event 2 Clicked:");
      console.log(e);
      {% for id in user_list %}
        {% if id.display_name != "@dan-lucas" %}
          console.log(">>>>>>>>>>> Classlist:")
          console.log(e.target.classList);
          if (e.target.classList.contains('card-body') || e.target.classList.contains('card-header')
              || e.target.classList.contains('win-clear')) {
            console.log("<<<< Event2 >>>> Setting " + user_popup_text{{ user.id }} + " display to none");
            user_popup_text{{ id.id }}.style.display = "none";
          }
        {% endif %}
      {% endfor %}
        });
  {% endif %}
{% endfor %}
