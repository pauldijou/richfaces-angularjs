/*! richangular - v0.0.1 - 2012-12-13
* TODO
* Copyright (c) 2012 ; Licensed  */


richApp.controller('AppCtrl', [
  '$rootScope', '$scope', function($rootScope, $scope) {
    $scope.navbarModel = [
      {
        text: 'Home',
        href: '#!/'
      }, {
        text: 'Input',
        dropdown: [
          {
            text: 'pickList',
            href: '#!/demo/pickList',
            dropdown: [
              {
                text: 'Basic',
                href: '#!/demo/pickList/basic'
              }
            ]
          }
        ]
      }, {
        text: 'Output',
        dropdown: [
          {
            text: 'label',
            href: '#!/demo/label',
            dropdown: [
              {
                text: 'Basic',
                href: '#!/demo/label/basic'
              }
            ]
          }, {
            text: 'badge',
            href: '#!/demo/badge',
            dropdown: [
              {
                text: 'Basic',
                href: '#!/demo/badge/basic'
              }, {
                text: 'Editable',
                href: '#!/demo/badge/editable'
              }
            ]
          }
        ]
      }
    ];
    $scope.getDemos = function(directiveName) {
      var result;
      result = [];
      angular.forEach($scope.navbarModel, function(topLevelLink) {
        if (topLevelLink.dropdown) {
          angular.forEach(topLevelLink.dropdown, function(link) {
            if (link.text === directiveName) {
              result = link.dropdown;
            }
          });
        }
      });
      return result;
    };
  }
]);


richApp.controller('DemoCtrl', [
  '$scope', '$routeParams', function($scope, $routeParams) {
    var getCode, getSource, loadFile, source;
    $scope.directiveName = $routeParams.directiveName;
    $scope.demoName = $routeParams.demoName;
    $scope.codeCache = {};
    $scope.sourceCache = {};
    $scope.languages = ['markup', 'css', 'javascript', 'java'];
    $scope.severities = ['primary', 'success', 'warning', 'error', 'danger', 'important', 'info', 'inverse'];
    $scope.scales = ['mini', 'small', 'medium', 'large', 'xlarge', 'xxlarge'];
    $scope.data = {
      language: "markup",
      severity: "",
      scale: "",
      list1: ["Elem1", "Elem2", "Elem3"],
      list2: [],
      input1: "value1",
      input2: "value2",
      input3: "value3",
      num1: 42,
      num2: 256,
      num3: 1337
    };
    $scope.isDemo = function() {
      return !!$scope.demoName;
    };
    $scope.getContentUrl = function() {
      if ($scope.isDemo()) {
        return "demo/examples/" + $scope.directiveName + "/" + $scope.demoName + ".html";
      } else {
        return "demo/examples/" + $scope.directiveName + "/doc.html";
      }
    };
    $scope.getSourceUrl = function() {
      return "modules/directives/" + $scope.directiveName + "/" + $scope.directiveName + ".coffee";
    };
    $scope.displayCode = function() {
      if ($scope.isDemo()) {
        return getCode($scope.directiveName, $scope.demoName);
      } else {
        return '';
      }
    };
    getCode = function() {
      if (!$scope.codeCache["" + $scope.directiveName + "/" + $scope.demo]) {
        $scope.codeCache["" + $scope.directiveName + "/" + $scope.demoName] = loadFile($scope.getContentUrl());
      }
      return $scope.codeCache["" + $scope.directiveName + "/" + $scope.demoName];
    };
    getSource = function() {
      if (!$scope.sourceCache[$scope.directiveName]) {
        $scope.sourceCache[$scope.directiveName] = loadFile($scope.getSourceUrl());
      }
      return $scope.sourceCache[$scope.directiveName];
    };
    loadFile = function(url) {
      var result;
      result = "";
      $.when($.ajax({
        url: url,
        type: 'GET',
        async: false
      })).then(function(args) {
        return result = args;
      });
      return result;
    };
    $scope.code = getCode();
    $scope.directive = {
      name: $scope.directiveName,
      attributes: []
    };
    source = getSource();
    angular.forEach(source.match(/^#\s*@attribute\(.*\)*$/gm), function(attributeLine) {
      return $scope.directive.attributes.push(angular.fromJson('{' + attributeLine.match(/^#\s*@attribute\((.*)\)$/)[1].replace(/(\w+)\:/g, '"$1":') + '}'));
    });
    $scope.directive.restrict = (source.match(/restrict\:\s?'([ACEM]{1,4})'/) || [])[1] || 'A';
    $scope.directive.transclude = (source.match(/transclude\:\s?'?(true|element)'?/) || [])[1];
    $scope.directive.priority = (source.match(/priority\:\s?(\d*)/) || [])[1];
    $scope.directive.require = (source.match(/require\:\s?(\d*)/) || [])[1];
    if ($scope.directive.require && $scope.directive.require.indexOf('?') === 0) {
      $scope.directive.require = $scope.require.priority.substr(1);
      $scope.directive.requireOptional = true;
    }
    if ($scope.directive.require && $scope.directive.require.indexOf('^') === 0) {
      $scope.directive.require = $scope.require.priority.substr(1);
      $scope.directive.requireParent = true;
    }
    $scope.directive.replace = !!(source.match(/replace\:\s?(true|false)/) || [])[1];
    $scope.directive.terminal = !!(source.match(/terminal\:\s?(true|false)/) || [])[1];
    $scope.directive.description = (source.match(/<1-- Description((.|\n)*)--1>/) || [])[1];
    if ($scope.directive.description) {
      $scope.directive.description = $.trim($scope.directive.description.replace(/\n#\s/g, ' '));
    }
  }
]);


richApp.controller('HomeCtrl', ['$scope', function($scope) {}]);
