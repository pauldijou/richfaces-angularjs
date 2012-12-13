# <1-- Description
# TODO
# --1>
# @attribute(name: "class", description: "assign CSS classes to the element")
# @attribute(name: "style", description: "assign CSS styles to the element")
# @attribute(name: "severity", values: ["success", "warning", "important","info","inverse"], description: "affect the design/color of the badge")
angular.module('richangular.directives').directive 'richControlGroup', ['richangular.config', (config) ->
  restrict: 'E'
  transclude: true
  replace: true
  scope:
    label: '@'
    for: '@'
    style: '@'
    class: '@'
  link: (scope, elem, attrs) ->
    return
  template: '<div class="control-group" data-ng-class="class" data-ng-style="style"><label class="control-label" for="{{for}}">{{label}}</label><div class="controls" data-ng-transclude="transclude"></div></div>'
]