import 'semantic-ui/dist/semantic.css'
import './app.sass'
const $ = window.jQuery = require('jquery/dist/jquery.js')
require('semantic-ui/dist/semantic.js')

$(() => {
  $('.ui.form > p').addClass('field')
  $('.ui.form select').dropdown()

  $('#ask_button').click(() => {
    $('.ui.modal').modal('show')
  })
});

// vi:et
