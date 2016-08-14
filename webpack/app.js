import 'semantic-ui/dist/semantic.css'
import './app.sass'
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

  // data
  const loadQuestions = () => {
    $.getJSON('./questions', j => {
      console.log(j)
      $('#questions h2').text(`${j.length} questions`)
      const $list = $('#questions .list').empty()
      j.forEach(x => {
        const $item = $('<div/>', {
          class: 'item',
        }).appendTo($list)
        $('<i/>', {
          class: 'large middle aligned user icon',
        }).appendTo($item)
        const $content = $('<div/>', {
          class: 'content',
        }).appendTo($item)
        $('<a/>', {
          class: 'header',
          href: '#',
          text: x.title,
        }).appendTo($content)
        $('<div/>', {
          class: 'description',
          text: `(${x.answer__count} answers)`,
        }).appendTo($content)
      })
    })
  }
  loadQuestions()
});

// vi:et
