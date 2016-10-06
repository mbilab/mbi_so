($ => {
  // behavior
  const $answerForm = $('#answer-form').ajaxForm({
    error: xhr => {
      serverSideError(
        xhr.responseJSON.form_errors || xhr.responseJSON,
        $('#answer-form')
      )
    },
    success: j => {
      console.log(j)
      $('#answer-form .error.field').removeClass('error')
      loadAnswers()
      $('#answer-form')[0].reset()
    },
  })
  $answerForm.find('[data-action]').click(function(e){
    e.preventDefault()
    $answerForm.attr('action', $(this).data('action')).submit()
  })
  $('#answers').on('click', 'button[type="submit"]', function(){
    const $form = $(this).parent('form')
    $form.ajaxSubmit({
      error: xhr => {
        serverSideError(
          xhr.responseJSON.form_errors || xhr.responseJSON,
          $form
        )
      },
      success: loadAnswers,
    })
    return false
  })
  const onAuth = () => {
    loadAuth()
    loadAnswers()
  }
  modalForm('.login-button', $('#login-modal'), onAuth)
  modalForm('.logout-button', $('#logout-modal'), onAuth)
  modalForm('.signup-button', $('#signup-modal'), onAuth)

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
