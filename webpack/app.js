import 'semantic-ui/dist/semantic.css'
import './app.sass'

import 'imports?define=>false,exports=>false,this=>window!moment/moment.js'
import 'imports?define=>false,exports=>false,this=>window!mustache/mustache.js'
const $ = window.jQuery = require('jquery/dist/jquery.js')
require('jquery-form/jquery.form.js')
require('semantic-ui/dist/semantic.js')

// server-side error message //! reusable
window.serverSideError = (err, $form) => {
  for (const key in err)
    $form.find(`[name='${key}']`).parent().addClass('error')
      .find('label > span').text(` (${err[key][0]})`)
}

window.modalForm = ($trigger, $modal, success) => {
  const $form = $modal.find('form')
  $trigger.click(() => {
    $modal.modal('show')
  })
  $modal.modal({
    onApprove: () => {
      $form.submit()
      return false
    },
    onHide: () => {
      $modal.find('.error.field').removeClass('error')
    }
  })
  $form.ajaxForm({
    error: xhr => {
      serverSideError(
        xhr.responseJSON.form_errors || xhr.responseJSON,
        $form
      )
    },
    success: j => {
      $modal.modal('hide')
      success()
      $form[0].reset()
    },
  })
}

$(() => {
  $('.ui.form > p').addClass('field')
    .find('label').append('<span/>')
  $('.ui.form select').dropdown()
  Mustache.tags = ['{', '}']

  // behavior
  modalForm($('.login-button'), $('#login-modal'), () => {})

  if ($('#answers').length)
    require('./question.js')
  else if ($('#questions').length)
    require('./index.js')
});

// vi:et
