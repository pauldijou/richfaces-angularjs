# <1-- Description
# TODO
# --1>
# @attribute(name: "source", description: "the left list")
# @attribute(name: "target", description: "the right list")
# @attribute(name: "class", description: "assign CSS classes to the element")
# @attribute(name: "style", description: "assign CSS styles to the element")
angular.module('richangular.directives').directive 'richPickList', ['richangular.config', (config) ->
  restrict: 'E'
  replace: true
  scope:
    source: '='
    target: '='
    style: '@'
    class: '@'
  link: (scope, elem, attrs) ->
    elem.addClass(scope.class) if scope.class
    elem.attr("style", scope.style) if scope.style

    sourceElem = elem.children('.source')
    targetElem = elem.children('.target')

    if attrs.source
      angular.forEach scope.source,(item) ->
        sourceElem.append("<li>#{item}</li>")

    if attrs.target
      angular.forEach scope.target,(item) ->
        targetElem.append("<li>#{item}</li>")

    elem.pickList()
    return
  template: '<div><ol class="source"></ol><ol class="target"></ol></div>'
]