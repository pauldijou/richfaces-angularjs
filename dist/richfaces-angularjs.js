/*! richfaces-angularjs - v0.0.1 - 2012-12-03
* TODO
* Copyright (c) 2012 ; Licensed  */


angular.module('richfaces.config', []).value('richfaces.config', {});

angular.module('richfaces.services', ['richfaces.config']);

angular.module('richfaces.directives', ['richfaces.config', 'richfaces.services']);

angular.module('richfaces.filters', ['richfaces.config', 'richfaces.services']);

angular.module('richfaces', ['richfaces.config', 'richfaces.directives', 'richfaces.filters', 'richfaces.services']);


angular.module('richfaces.directives').directive('pickList', [
  'richfaces.config', function(config) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        source: '=',
        target: '=',
        style: '@',
        "class": '@'
      },
      link: function(scope, elem, attrs) {
        var sourceElem, targetElem;
        if (scope["class"]) {
          elem.addClass(scope["class"]);
        }
        if (scope.style) {
          elem.attr("style", scope.style);
        }
        sourceElem = elem.children('.source');
        targetElem = elem.children('.target');
        if (attrs.source) {
          angular.forEach(scope.source, function(item) {
            return sourceElem.append("<li>" + item + "</li>");
          });
        }
        if (attrs.target) {
          angular.forEach(scope.target, function(item) {
            return targetElem.append("<li>" + item + "</li>");
          });
        }
        elem.pickList();
      },
      template: '<div><ol class="source"></ol><ol class="target"></ol></div>'
    };
  }
]);


angular.module('richfaces.directives').directive('navbar', [
  'richfaces.config', function(config) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        style: '@',
        "class": '@',
        collapse: '@',
        position: '@',
        brand: '@',
        brandHref: '@',
        model: '='
      },
      compile: function(template, attrs, transclude) {
        var container;
        container = template.children(".navbar-inner").children(".container");
        if (attrs.brand) {
          container.append('<a class="brand" data-ng-href="' + attrs.brandHref + '">' + attrs.brand + '</a>');
        }
        if (attrs.collapse) {
          container.append('<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a><div class="nav-collapse collapse"></div>');
          container = container.children(".nav-collapse");
        }
        if (!attrs.model) {
          container.attr("data-ng-transclude", "transclude");
        }
        return function(scope, elem, attrs) {
          var writeGroup, writeLink;
          scope.styles = attrs.style;
          scope.classes = 'navbar';
          if (attrs.position) {
            scope.classes += ' navbar-' + attrs.position;
          }
          if (attrs["class"]) {
            scope.classes += ' ' + attrs["class"];
          }
          writeGroup = function(group, index, container) {
            var groupContainer;
            groupContainer = container.append('<ul class="nav"></ul>').children('ul').eq(index);
            if (group.position) {
              groupContainer.addClass('pull-' + group.position);
            }
            return angular.forEach(group.links, function(link, index) {
              writeLink(link, index, groupContainer, 0);
            });
          };
          writeLink = function(link, index, container, level) {
            var liElem;
            container.append('<li><a href="' + (link.href ? link.href : '#') + '">' + link.text + '</a></li>');
            liElem = container.children().eq(index);
            if (link.active) {
              liElem.addClass("active");
            }
            if (link.dropdown) {
              if (level === 0) {
                liElem.addClass("dropdown");
              } else {
                liElem.addClass("dropdown-submenu");
              }
              if (level === 0) {
                liElem.find('a').attr("data-toggle", "dropdown").append(' <b class="caret"></b>');
              }
              liElem.append('<ul class="dropdown-menu"></ul>');
              return angular.forEach(link.dropdown, function(link, index) {
                writeLink(link, index, liElem.find('ul'), level + 1);
              });
            }
          };
          if (scope.model) {
            if (scope.model[0].links) {
              angular.forEach(scope.model, function(group, index) {
                writeGroup(group, index, container);
              });
            } else {
              container.append('<ul class="nav"></ul>');
              angular.forEach(scope.model, function(link, index) {
                writeLink(link, index, container.children('ul'), 0);
              });
            }
          }
        };
      },
      template: '<div data-ng-class="classes" data-ng-style="styles"><div class="navbar-inner"><div class="container"></div></div></div>'
    };
  }
]);


angular.module('richfaces.directives').directive('badge', [
  'richfaces.config', function(config) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        style: '@',
        "class": '@',
        severity: '@'
      },
      link: function(scope, elem, attrs) {
        scope.styles = attrs.style;
        scope.classes = 'badge';
        if (attrs.severity) {
          scope.classes += ' badge-' + attrs.severity;
        }
        if (attrs["class"]) {
          return scope.classes += ' ' + attrs["class"];
        }
      },
      template: '<span data-ng-class="classes" data-ng-style="styles" data-ng-transclude="transclude"></span>'
    };
  }
]);


angular.module('richfaces.directives').directive('codeblock', [
  'richfaces.config', 'html', function(config, html) {
    return {
      restrict: 'E',
      replace: true,
      link: function(scope, elem, attrs) {
        var codeElem;
        console.log(elem);
        codeElem = elem.children('code');
        codeElem.attr("class", "language-markup");
        attrs.$observe('style', function(value) {
          return elem.attr('style', value);
        });
        attrs.$observe('class', function(value) {
          return elem.attr('class', value);
        });
        attrs.$observe('language', function(value) {
          console.log("lang: " + value);
          if (value) {
            codeElem.attr("class", "language-" + value);
            return Prism.highlightElement(codeElem[0]);
          }
        });
        attrs.$observe('src', function(value) {
          codeElem.children().remove();
          codeElem.append(html.escape(value));
          return Prism.highlightElement(codeElem[0]);
        });
      },
      template: '<pre><code></code></pre>'
    };
  }
]);


angular.module('richfaces.services').service('html', [
  function() {
    return {
      escape: function(string) {
        return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
      }
    };
  }
]);


angular.module('richfaces.filters').filter('escapeHtml', [
  'richfaces.config', function(config) {
    return function(input) {
      return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };
  }
]);
