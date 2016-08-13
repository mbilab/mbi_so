import 'semantic-ui/dist/semantic.css'
import './app.sass'
const $ = window.jQuery = require('jquery/dist/jquery.js')
require('semantic-ui/dist/semantic.js')
require('jquery-form/jquery.form.js')

$(() => {
  $('.ui.form > p').addClass('field')
  $('.ui.form select').dropdown()

  $('#ask_button').click(() => {
    $('.ui.modal').modal({
      onApprove: () => {
        $('form').ajaxSubmit(j => {
          console.log(j)
        })
      },
    }).modal('show')
  })
});

// vi:et
