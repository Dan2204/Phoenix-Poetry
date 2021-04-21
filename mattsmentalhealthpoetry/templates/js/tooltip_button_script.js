
//////////////////////////////
// TOOLTIP ACTIVATE BY BUTTON
//////////////////////////////

{% for i in range(comments | length) %}

  {% if comments[i].comment | length > 50 %}
    {% set content = comments[i].comment[:50] %}
  {% else %}
    {% set content = comments[i].comment %}
  {% endif %}

  {% if content | length > 49 %}

    const win_size{{ comments[i].id }} = window.matchMedia("(max-width: 600px)");
    const text_tag{{ comments[i].id }} = document.getElementById("comment_tt_text{{ comments[i].id }}");
    const select_dots{{ comments[i].id }} = document.getElementById("toggle-click-hover{{ comments[i].id }}");

    toggleHoverClick{{ comments[i].id }}(win_size{{ comments[i].id }});
    win_size{{ comments[i].id }}.addListener(toggleHoverClick{{ comments[i].id }});

    function toggleHoverClick{{ comments[i].id }}(win_size{{ comments[i].id }}) {
      if (win_size{{ comments[i].id }}.matches) {
        if (select_dots{{ comments[i].id }}.classList.contains("comment_tooltip_hover")) {
          select_dots{{ comments[i].id }}.classList.remove("comment_tooltip_hover");
          select_dots{{ comments[i].id }}.classList.add("comment_tooltip_click");
        }
        setClickEvents{{ comments[i].id }}();
      } else {
        if (select_dots{{ comments[i].id }}.classList.contains("comment_tooltip_click")) {
          select_dots{{ comments[i].id }}.classList.remove("comment_tooltip_click");
          select_dots{{ comments[i].id }}.classList.add("comment_tooltip_hover");
          if (text_tag{{ comments[i].id }}.style.visibility = "visible") {
            text_tag{{ comments[i].id }}.style.visibility = "";
            text_tag{{ comments[i].id }}.style.opacity = "";
          }
        }
        removeClickEvents{{ comments[i].id }}();
      }
    }

    function toggle_tip{{ comments[i].id }}() {
      if (text_tag{{ comments[i].id }}.style.visibility == "visible") {
        text_tag{{ comments[i].id }}.style.visibility = "hidden";
        text_tag{{ comments[i].id }}.style.opacity = "0";
      } else {
        text_tag{{ comments[i].id }}.style.visibility = "visible";
        text_tag{{ comments[i].id }}.style.opacity = "1";
      }
    }

    function setClickEvents{{ comments[i].id }}() {
      select_dots{{ comments[i].id }}.addEventListener("click", toggle_tip{{ comments[i].id }});
    }

    function removeClickEvents{{ comments[i].id }}() {
      select_dots{{ comments[i].id }}.removeEventListener("click", toggle_tip{{ comments[i].id }});
    }

  {% endif %}
{% endfor %}
