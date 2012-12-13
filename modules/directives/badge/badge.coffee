# <1-- Description
# TODO
# --1>
# @attribute(name: "class", description: "assign CSS classes to the element")
# @attribute(name: "style", description: "assign CSS styles to the element")
# @attribute(name: "severity", values: ["success", "warning", "important","info","inverse"], description: "affect the design/color of the badge")
angular.module('richangular.directives').directive 'richBadge', ['richangular.config', (config) ->
  restrict: 'E'
  transclude: true
  replace: true
  scope:
    severity: '@'
    style: '@'
    class: '@'
  link: (scope, elem, attrs) ->
    attrs.$observe 'severity',(value) ->
      elem.removeClass scope.severityClass
      if value
        value = ' badge-'+value
      scope.severityClass = value
      elem.addClass scope.severityClass

  template: '<span class="badge" data-ng-class="class" data-ng-style="style" data-ng-transclude="transclude"></span>'
]