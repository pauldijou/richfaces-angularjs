angular.module('richfaces.directives').directive 'codeblock',['richfaces.config', 'html', (config, html) ->
  restrict: 'E'
  replace: true
  link: (scope, elem, attrs) ->
    console.log elem
    codeElem = elem.children('code')
    codeElem.attr "class","language-markup"

    attrs.$observe 'style',(value) ->
      elem.attr 'style',value

    attrs.$observe 'class',(value) ->
      elem.attr 'class',value

    attrs.$observe 'language',(value) ->
      console.log "lang: #{value}"
      if value
        codeElem.attr "class","language-#{value}"
        Prism.highlightElement codeElem[0]

    attrs.$observe 'src',(value) ->
      codeElem.children().remove()
      codeElem.append(html.escape(value))
      Prism.highlightElement codeElem[0]

    return

  template: '<pre><code></code></pre>'
]