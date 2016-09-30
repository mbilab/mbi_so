import 'semantic-ui/dist/semantic.css'
import './app.sass'

import 'imports?define=>false,exports=>false,this=>window!moment/moment.js'
import 'imports?define=>false,exports=>false,this=>window!mustache/mustache.js'
const $ = window.jQuery = require('jquery/dist/jquery.js')
require('jquery.cookie/jquery.cookie.js')
require('jquery-form/jquery.form.js')
require('semantic-ui/dist/semantic.js')

window.message = text => {
  const tmpl = $('#message-tmpl').html()
  const $message = $(Mustache.render(tmpl, {text: text})).appendTo($('#messages'))
  $message.transition('fade left')
  setTimeout(() => {
    $message.transition({
      animation: 'fade left',
      onComplete: () => {
        $message.remove()
      },
    })
  }, 3000)
}

// server-side error message //! reusable
window.serverSideError = (err, $form) => {
  if (err.__all__)
    message(err.__all__)
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
      $form.find('.error.field').removeClass('error')
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
    const tmpl = $('#auth-tmpl').html()
    if (!tmpl) return
    $.getJSON('/auth', j => {
      $('#auth').html(Mustache.render(tmpl, j))
      $('[name=csrfmiddlewaretoken]').val($.cookie('csrftoken'))
    })
  }
  loadAuth()

  // behavior
  modalForm('.login-button', $('#login-modal'), loadAuth)
  modalForm('.logout-button', $('#logout-modal'), loadAuth)
  $('#messages').on('click', '.message .close', function(){
    $(this).closest('.message').transition('fade left')
  })

  if ($('#answers').length)
    require('./question.js')
  else if ($('#questions').length)
    require('./index.js')
});

// vi:et
