($ => {
  // behavior
  modalForm($('#ask-button'), $('#ask-modal'), loadQuestions)

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
