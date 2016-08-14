import 'semantic-ui/dist/semantic.css'
import './app.sass'
const $ = window.jQuery = require('jquery/dist/jquery.js')
require('semantic-ui/dist/semantic.js')
require('jquery-form/jquery.form.js')

$(() => {
  $('.ui.form > p').addClass('field')
  $('.ui.form select').dropdown()

  $('form').ajaxForm({
    beforeSubmit: () => { $('.ui.modal').modal('hide') },
    success: j => { console.log(j) },
  })
  $('#ask_button').click(() => {
    $('.ui.modal').modal({
      onApprove: () => { $('form').submit() },
    }).modal('show')
  })
});

// vi:et
