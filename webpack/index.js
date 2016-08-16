($ => {
  // behavior
  $('#ask-button').click(() => {
    $('.ui.modal').modal('show')
  })
  $('.ui.modal').modal({
    onApprove: () => {
      $('form').submit()
      return false
    },
    onHide: () => {
      $('.ui.form .error.field').removeClass('error')
    }
  })
  $('form').ajaxForm({
    success: j => {
      if (j.ok) {
        $('.ui.modal').modal('hide')
        loadQuestions()
        $('form')[0].reset()
      } else {
        serverSideError(j, $('form'))
      }
    },
  })

  // data
  const loadQuestions = () => {
    $.getJSON('./questions', j => {
      for (const x in j.questions)
        j.questions[x].date = moment(j.questions[x].date).fromNow()
      const tmpl = $('#questions-tmpl').html()
      $('#questions').html(Mustache.render(tmpl, j))
    })
  }
  loadQuestions()
})(jQuery)

// vi:et
