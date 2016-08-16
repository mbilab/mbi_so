import 'semantic-ui/dist/semantic.css'
import './app.sass'
import 'imports?define=>false,exports=>false,this=>window!mustache/mustache.js'
const $ = window.jQuery = require('jquery/dist/jquery.js')
require('semantic-ui/dist/semantic.js')
require('jquery-form/jquery.form.js')

// server-side error message //! reusable
const serverSideError = (err, $form) => {
   for (const key in err)
     $form.find(`[name='${key}']`).parent().addClass('error')
       .find('label > span').text(` (${err[key][0]})`)
}

$(() => {
  // style
  $('.ui.form > p').addClass('field')
    .find('label').append('<span/>')

  // behavior
  $('#ask_button').click(() => {
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
  $('.ui.form select').dropdown()
  Mustache.tags = ['{', '}']

  // data
  const loadAnswers = () => {
    $.getJSON('./answers', j => {
      const tmpl = $('#answers-tmpl').html()
      $('#answers').html(Mustache.render(tmpl, j))
    })
  }
  const loadQuestions = () => {
    $.getJSON('./questions', j => {
      const tmpl = $('#questions-tmpl').html()
      $('#questions').html(Mustache.render(tmpl, j))
    })
  }
  if ($('#answers').length)
    loadAnswers()
  else if ($('#questions').length)
    loadQuestions()
});

// vi:et
