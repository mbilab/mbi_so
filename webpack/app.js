import 'semantic-ui/dist/semantic.css'
import './app.sass'

import 'imports?define=>false,exports=>false,this=>window!moment/moment.js'
import 'imports?define=>false,exports=>false,this=>window!mustache/mustache.js'
const $ = window.jQuery = require('jquery/dist/jquery.js')
require('jquery.cookie/jquery.cookie.js')
require('jquery-form/jquery.form.js')
require('semantic-ui/dist/semantic.js')

window.loadAuth = () => {
  // http://stackoverflow.com/questions/7131909/facebook-callback-appends-to-return-url
  if (window.location.hash == '#_=_')
    history.replaceState 
    ? history.replaceState(null, null, window.location.href.split('#')[0])
    : window.location.hash = ''

  const tmpl = $('#auth-tmpl').html()
  if (!tmpl) return
  $.getJSON('/auth', j => {
    $('#auth').html(Mustache.render(tmpl, j))
    $('[name=csrfmiddlewaretoken]').val($.cookie('csrftoken'))
  })
}

window.message = text => {
  const tmpl = $('#message-tmpl').html()
  const $message = $(Mustache.render(tmpl, {text: text})).appendTo($('#messages'))
  $message.transition('fade left in')
  setTimeout(() => {
    messageOff($message)
  }, 3000)
}

window.messageOff = $message => {
  $message.transition({
    animation: 'fade left out',
    onComplete: () => {
      $message.remove()
    },
  })
}

// server-side error message //! reusable
window.serverSideError = (err, $form) => {
  if (err.__all__)
    message(err.__all__)
  for (const key in err)
    $form.find(`[name='${key}']`).parent().addClass('error')
      .find('label > span').text(` (${err[key][0]})`)
  var $container = $form.closest('.modal')
  if (!$container.length) $container = $form
  $container.transition('shake', 150)
}

// form inside a semantic-ui modal //! reusable
window.modalForm = (trigger, $modal, success) => {
  const $form = $modal.find('form')
  $('body').on('click', trigger, e => {
    e.preventDefault()
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
  loadAuth()

  // behavior
  $('#messages').on('click', '.message .close', function(){
    messageOff($(this).closest('.message'))
  })

  if ($('#answers').length)
    require('./question.js')
  else if ($('#questions').length)
    require('./index.js')
});

// vi:et
