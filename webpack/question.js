($ => {
  // behavior
  $('form').ajaxForm({
    success: j => {
      if (j.ok) {
        $('.ui.form .error.field').removeClass('error')
        loadAnswers()
        $('form')[0].reset()
      } else {
        serverSideError(j, $('form'))
      }
    },
  })

  // data
  const loadAnswers = () => {
    $.getJSON('./answers', j => {
      const tmpl = $('#answers-tmpl').html()
      $('#answers').html(Mustache.render(tmpl, j))
    })
  }
  loadAnswers()
})(jQuery)

// vi:et
