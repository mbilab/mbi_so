import 'semantic-ui/dist/semantic.css'
import './app.sass'
const $ = window.jQuery = require('jquery/dist/jquery.js')
require('semantic-ui/dist/semantic.js')
require('jquery-form/jquery.form.js')

// server-side error message //! resuable
const serverSideError = (err, $form) => {
   for (const key in err)
     $form.find(`[name='${key}']`).parent().addClass('error')
       .find('label > span').text(` (${err[key][0]})`)
}

$(() => {
  $('.ui.form > p').addClass('field')
    .find('label').append('<span/>')
  $('.ui.form select').dropdown()
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
        console.log(j)
        $('.ui.modal').modal('hide')
      } else {
        serverSideError(j, $('form'))
      }
    },
  })
  $('#ask_button').click(() => {
    $('.ui.modal').modal('show')
  })
});

// vi:et
