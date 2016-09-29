import 'semantic-ui/dist/semantic.css'
import './app.sass'

import 'imports?define=>false,exports=>false,this=>window!moment/moment.js'
import 'imports?define=>false,exports=>false,this=>window!mustache/mustache.js'
const $ = window.jQuery = require('jquery/dist/jquery.js')
require('jquery.cookie/jquery.cookie.js')
require('jquery-form/jquery.form.js')
require('semantic-ui/dist/semantic.js')

// server-side error message //! reusable
window.serverSideError = (err, $form) => {
  $form.addClass('error')
  if (err.__all__)
    $form.find('.error.message').text(err.__all__)
  for (const key in err)
    $form.find(`[name='${key}']`).parent().addClass('error')
      .find('label > span').text(` (${err[key][0]})`)
}

window.modalForm = (trigger, $modal, success) => {
  const $form = $modal.find('form')
  $('body').on('click', trigger, () => {
    $modal.modal('show')
  })
  $modal.modal({
    onApprove: () => {
      $form.submit()
      return false
    },
    onHide: () => {
      $form.removeClass('error').find('.error.field').removeClass('error')
    }
  })
  $form.ajaxForm({
    error: xhr => {
      serverSideError(
        xhr.responseJSON.form_errors || xhr.responseJSON,
        $form
      )
    },
    success: () => {
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

  // data
  const loadAuth = () => {
    $.getJSON('./auth', j => {
      const tmpl = $('#auth-tmpl').html()
      $('#auth').html(Mustache.render(tmpl, j))
      $('[name=csrfmiddlewaretoken]').val($.cookie('csrftoken'))
    })
  }
  loadAuth()

  // behavior
  modalForm('.login-button', $('#login-modal'), loadAuth)
  modalForm('.logout-button', $('#logout-modal'), loadAuth)

  if ($('#answers').length)
    require('./question.js')
  else if ($('#questions').length)
    require('./index.js')
});

// vi:et
