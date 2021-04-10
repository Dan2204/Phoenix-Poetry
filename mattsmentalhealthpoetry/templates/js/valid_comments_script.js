



{% for other_poem in poems %}
  {% if not other_poem.id == poem.id %}
    const num_comments{{ other_poem.id }} = document.getElementById('num-comments{{ other_poem.id }}');
    let auth_comments{{ other_poem.id }} = 0;

    {% for comment in other_poem.comments %}
      {% if comment.approve and comment.active %}
        auth_comments{{ other_poem.id }} += 1;
      {% endif %}
    {% endfor %}

    num_comments{{ other_poem.id }}.innerHTML = String(auth_comments{{ other_poem.id }});

  {% endif %}
{% endfor %}
