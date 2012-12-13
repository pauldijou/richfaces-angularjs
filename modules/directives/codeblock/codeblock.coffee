angular.module('richangular.directives').directive 'richCodeblock',['richangular.config', 'html', (config, html) ->
  restrict: 'E'
  replace: true
  transclude: true
  scope:
    language: '@'
    src: '@'
    style: '@'
    class: '@'
  link: (scope, elem, attrs) ->
    codeElem = elem.children('code')
    codeElem.attr "class","language-markup"

    attrs.$observe 'language',(value) ->
      if value
        codeElem.attr "class","language-#{value}"
        Prism.highlightElement codeElem[0]

    attrs.$observe 'src',(value) ->
      if value
        codeElem.html(html.escape(value))
      Prism.highlightElement codeElem[0]

    return

  template: '<pre data-ng-class="class" data-ng-style="style"><code data-ng-transclude="transclude"></code></pre>'
]