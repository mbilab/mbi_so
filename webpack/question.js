($ => {
  // behavior
  $('#answer-form').ajaxForm({
    error: xhr => {
      serverSideError(
        xhr.responseJSON.form_errors || xhr.responseJSON,
        $('#answer-form')
      )
    },
    success: j => {
      $('#answer-form .error.field').removeClass('error')
      loadAnswers()
      $('#answer-form')[0].reset()
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
      for (const i in j.answers) {
        const x = j.answers[i]
        x.date = moment(x.date).fromNow()
        x.down_btn = x.vote__weight === 0 ? 'active' : 'basic'
        x.up_btn = x.vote__weight === 1 ? 'active' : 'basic'
      }
      const tmpl = $('#answers-tmpl').html()
      $('#answers').html(Mustache.render(tmpl, j))
    })
  }
  loadAnswers()
})(jQuery)

// vi:et
