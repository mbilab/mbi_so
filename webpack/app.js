import 'semantic-ui/dist/semantic.css'
import './app.sass'

import 'imports?define=>false,exports=>false,this=>window!mustache/mustache.js'
const $ = window.jQuery = require('jquery/dist/jquery.js')
require('semantic-ui/dist/semantic.js')
require('jquery-form/jquery.form.js')

// server-side error message //! reusable
window.serverSideError = (err, $form) => {
   for (const key in err)
     $form.find(`[name='${key}']`).parent().addClass('error')
       .find('label > span').text(` (${err[key][0]})`)
}

$(() => {
  $('.ui.form > p').addClass('field')
    .find('label').append('<span/>')
  $('.ui.form select').dropdown()
  Mustache.tags = ['{', '}']

  // data
  if ($('#answers').length)
    require('./question.js')
  else if ($('#questions').length)
    require('./index.js')
});

// vi:et
