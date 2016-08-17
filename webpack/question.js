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
  $('h1 .date').text(
    moment($('h1 .date').text()).fromNow()
  )
  const loadAnswers = () => {
    $.getJSON('./answers', j => {
      for (const x in j.answers)
        j.answers[x].date = moment(j.answers[x].date).fromNow()
      const tmpl = $('#answers-tmpl').html()
      $('#answers').html(Mustache.render(tmpl, j))
    })
  }
  loadAnswers()
})(jQuery)

// vi:et
