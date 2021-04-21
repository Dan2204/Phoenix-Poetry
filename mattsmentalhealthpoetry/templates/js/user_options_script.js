




// USER OPTIONS POPUPS //
{% for user in user_list %}
  {% if user.display_name != "@dan-lucas" %}
    const user_popup{{ user.id }} = document.getElementById('user-select-popup{{ user.id }}');
    const user_popup_text{{ user.id }} = document.getElementById('user-select-popup-text{{ user.id }}');
  {% endif %}
{% endfor %}

{% for user in user_list %}
  {% if user.display_name != "@dan-lucas" %}

    user_popup{{ user.id }}.addEventListener('click', (e) => {
      {% for id in user_list %}
        {% if id.display_name != "@dan-lucas" %}
          {% if id != user %}
            user_popup_text{{ id.id }}.style.display = "none";
          {% endif %}
        {% endif %}
      {% endfor %}

      if (user_popup_text{{ user.id }}.style.display == "block") {
        user_popup_text{{ user.id }}.style.display = "none";
      } else {
        user_popup_text{{ user.id }}.style.display = "block";
      }
    });

    window.addEventListener('click', e => {
      {% for id in user_list %}
        {% if id.display_name != "@dan-lucas" %}
          if (e.target.classList.contains('card-body') || e.target.classList.contains('card-header')
              || e.target.classList.contains('win-clear')) {
            user_popup_text{{ id.id }}.style.display = "none";
          }
        {% endif %}
      {% endfor %}
        });
  {% endif %}
{% endfor %}
