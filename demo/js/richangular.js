/*! richangular - v0.0.1 - 2012-12-13
* TODO
* Copyright (c) 2012 ; Licensed  */


angular.module('richangular.config', []).value('richangular.config', {});

angular.module('richangular.services', ['richangular.config']);

angular.module('richangular.directives', ['richangular.config', 'richangular.services']);

angular.module('richangular.filters', ['richangular.config', 'richangular.services']);

angular.module('richangular', ['richangular.config', 'richangular.directives', 'richangular.filters', 'richangular.services']);


angular.module('richangular.directives').directive('richPickList', [
  'richangular.config', function(config) {
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


angular.module('richangular.directives').directive('richNavbar', [
  'richangular.config', function(config) {
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
              liElem = liElem.append('<ul class="dropdown-menu"></ul>').find('ul');
              return angular.forEach(link.dropdown, function(link, index) {
                writeLink(link, index, liElem, level + 1);
              });
            }
          };
          if (scope.model) {
            if (scope.model[0].links) {
              angular.forEach(scope.model, function(group, index) {
                writeGroup(group, index, container);
              });
            } else {
              container = container.append('<ul class="nav"></ul>').children('ul');
              angular.forEach(scope.model, function(link, index) {
                writeLink(link, index, container, 0);
              });
            }
          }
        };
      },
      template: '<div data-ng-class="classes" data-ng-style="styles"><div class="navbar-inner"><div class="container"></div></div></div>'
    };
  }
]);


angular.module('richangular.directives').directive('richControlGroup', [
  'richangular.config', function(config) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        label: '@',
        "for": '@',
        style: '@',
        "class": '@'
      },
      link: function(scope, elem, attrs) {},
      template: '<div class="control-group" data-ng-class="class" data-ng-style="style"><label class="control-label" for="{{for}}">{{label}}</label><div class="controls" data-ng-transclude="transclude"></div></div>'
    };
  }
]);


angular.module('richangular.directives').directive('richLabel', [
  'richangular.config', function(config) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        severity: '@',
        style: '@',
        "class": '@'
      },
      link: function(scope, elem, attrs) {
        return attrs.$observe('severity', function(value) {
          elem.removeClass(scope.severityClass);
          if (value) {
            value = ' label-' + value;
          }
          scope.severityClass = value;
          return elem.addClass(scope.severityClass);
        });
      },
      template: '<span class="label" data-ng-class="class" data-ng-style="style" data-ng-transclude="transclude"></span>'
    };
  }
]);


angular.module('richangular.directives').directive('richBadge', [
  'richangular.config', function(config) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        severity: '@',
        style: '@',
        "class": '@'
      },
      link: function(scope, elem, attrs) {
        return attrs.$observe('severity', function(value) {
          elem.removeClass(scope.severityClass);
          if (value) {
            value = ' badge-' + value;
          }
          scope.severityClass = value;
          return elem.addClass(scope.severityClass);
        });
      },
      template: '<span class="badge" data-ng-class="class" data-ng-style="style" data-ng-transclude="transclude"></span>'
    };
  }
]);


angular.module('richangular.directives').directive('richCodeblock', [
  'richangular.config', 'html', function(config, html) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        language: '@',
        src: '@',
        style: '@',
        "class": '@'
      },
      link: function(scope, elem, attrs) {
        var codeElem;
        codeElem = elem.children('code');
        codeElem.attr("class", "language-markup");
        attrs.$observe('language', function(value) {
          if (value) {
            codeElem.attr("class", "language-" + value);
            return Prism.highlightElement(codeElem[0]);
          }
        });
        attrs.$observe('src', function(value) {
          if (value) {
            codeElem.html(html.escape(value));
          }
          return Prism.highlightElement(codeElem[0]);
        });
      },
      template: '<pre data-ng-class="class" data-ng-style="style"><code data-ng-transclude="transclude"></code></pre>'
    };
  }
]);


angular.module('richangular.services').service('html', [
  function() {
    return {
      escape: function(string) {
        return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
      }
    };
  }
]);


angular.module('richangular.filters').filter('escapeHtml', [
  'richangular.config', function(config) {
    return function(input) {
      return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };
  }
]);
