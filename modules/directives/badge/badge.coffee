# <1-- Description
# TODO
# --1>
# @attribute(name: "class", description: "assign CSS classes to the element")
# @attribute(name: "style", description: "assign CSS styles to the element")
# @attribute(name: "severity", values: ["success", "warning", "important","info","inverse"], description: "affect the design/color of the badge")
angular.module('richfaces.directives').directive 'badge', ['richfaces.config', (config) ->
  restrict: 'E'
  transclude: true
  replace: true
  scope:
    style: '@'
    class: '@'
    severity: '@'
  link: (scope, elem, attrs) ->
    scope.styles = attrs.style
    scope.classes = 'badge'
    scope.classes += ' badge-'+attrs.severity if attrs.severity
    scope.classes += ' '+attrs.class if attrs.class
  template: '<span data-ng-class="classes" data-ng-style="styles" data-ng-transclude="transclude"></span>'
]