($ => {
  // behavior
  $('#answer-form').ajaxForm({
    success: j => {
      if (j.ok) {
        $('#answer-form .error.field').removeClass('error')
        loadAnswers()
        $('#answer-form')[0].reset()
      } else {
        serverSideError(j, $('#answer-form'))
      }
    },
  })
  $('#answers').on('click', 'button[type="submit"]', function(){
    $(this).parent('form').ajaxSubmit(j => {
      loadAnswers()
    })
    return false
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
