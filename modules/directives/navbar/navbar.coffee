angular.module('richangular.directives').directive 'richNavbar', ['richangular.config', (config) ->
  restrict: 'E'
  transclude: true
  replace: true
  scope:
    style: '@'
    class: '@'
    collapse: '@'
    position: '@'
    brand: '@'
    brandHref: '@'
    model: '='
  compile: (template, attrs, transclude) ->
    container = template.children(".navbar-inner").children(".container")
    container.append('<a class="brand" data-ng-href="'+attrs.brandHref+'">'+attrs.brand+'</a>') if attrs.brand

    if attrs.collapse
      container.append('<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a><div class="nav-collapse collapse"></div>')
      container = container.children(".nav-collapse")

    if !attrs.model
      container.attr("data-ng-transclude", "transclude")

    (scope, elem, attrs) ->
      scope.styles = attrs.style
      scope.classes = 'navbar'
      scope.classes += ' navbar-'+attrs.position if attrs.position
      scope.classes += ' '+attrs.class if attrs.class

      writeGroup = (group, index, container) ->
        groupContainer = container.append('<ul class="nav"></ul>').children('ul').eq(index)
        groupContainer.addClass('pull-'+group.position) if group.position
        angular.forEach(group.links, (link, index) -> writeLink(link, index, groupContainer, 0); return)

      writeLink = (link, index, container, level) ->
        container.append('<li><a href="'+(if link.href then link.href else '#')+'">' + link.text + '</a></li>')
        liElem = container.children().eq(index)
        liElem.addClass "active" if link.active
        if link.dropdown
          if level == 0 then liElem.addClass "dropdown" else liElem.addClass "dropdown-submenu"
          liElem.find('a').attr("data-toggle", "dropdown").append(' <b class="caret"></b>') if level == 0
          liElem.append('<ul class="dropdown-menu"></ul>')
          angular.forEach(link.dropdown, (link, index) -> writeLink(link, index, liElem.find('ul'), level+1); return)


      if scope.model
        if(scope.model[0].links)
          angular.forEach(scope.model, (group, index) -> writeGroup(group, index, container); return)
        else
          container.append('<ul class="nav"></ul>')
          angular.forEach(scope.model, (link, index) -> writeLink(link, index, container.children('ul'), 0); return)

      return
  template: '<div data-ng-class="classes" data-ng-style="styles"><div class="navbar-inner"><div class="container"></div></div></div>'
]