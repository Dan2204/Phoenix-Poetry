



{% for other_poem in poems %}
  {% if not other_poem.id == poem.id %}

    console.log("Setting up.....");

    // SET NUM_COMMENTS
    const num_comments{{ other_poem.id }} = document.getElementById('num-comments{{ other_poem.id }}');
    let auth_comments{{ other_poem.id }} = 0;

    {% for comment in other_poem.comments %}
      {% if comment.approve and comment.active %}
        auth_comments{{ other_poem.id }} += 1;
      {% endif %}
    {% endfor %}

    num_comments{{ other_poem.id }}.innerHTML = String(auth_comments{{ other_poem.id }});


    // SET TITLE LENGTH
    const win_size_{{ other_poem.id }} = window.matchMedia("(max-width: 600px)");
    const text_tag_{{ other_poem.id }} = document.getElementById("select-title{{ other_poem.id }}");

    console.log(win_size_{{ other_poem.id }});

    setTitleLength{{ other_poem.id }}(win_size_{{ other_poem.id }});
    win_size_{{ other_poem.id }}.addListener(setTitleLength{{ other_poem.id }});

    function setTitleLength{{ other_poem.id }}(win_size_{{ other_poem.id }}) {
      if (win_size_{{ other_poem.id }}.matches) {
        let tl = getLen{{ other_poem.id }}(12);
        console.log("max-width < 400px: tl = " + tl);
        if (tl == 10) {
          text_tag_{{ other_poem.id }}.innerHTML = "'" + "{{ other_poem.title }}".substr(0, tl) + "..'";
        } else {
          text_tag_{{ other_poem.id }}.innerHTML = "'{{ other_poem.title }}'";
        }
      } else {
        let tl = getLen{{ other_poem.id }}(15);
        console.log("max-width > 400px: tl = " + tl)
        if (tl == 13) {
          text_tag_{{ other_poem.id }}.innerHTML = "'" + "{{ other_poem.title }}".substr(0, tl) + "..'";
        } else {
          text_tag_{{ other_poem.id }}.innerHTML = "'{{ other_poem.title }}'";
        }
      }
    }

    function getLen{{ other_poem.id }}(size) {
      let gotLen = 0;
      if ("{{ other_poem.title }}".length > size) {
        gotLen = size - 2;
        console.log("{{ other_poem.title }} too long, Setting gotLen to: " + size);
      } else {
        gotLen = "{{ other_poem.title }}".length;
        console.log("Setting gotLen to length of: {{ other_poem.title }}: " + gotLen);
      }
      console.log("Returning: " + gotLen);
      return gotLen;
    }



  {% endif %}
{% endfor %}
