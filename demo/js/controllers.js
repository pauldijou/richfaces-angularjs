/*! richfaces-angularjs - v0.0.1 - 2012-12-03
* TODO
* Copyright (c) 2012 ; Licensed  */


richfacesApp.controller('AppCtrl', [
  '$rootScope', '$scope', function($rootScope, $scope) {
    $scope.examples = {
      badge: ['basic', 'severity', 'style'],
      label: ['basic', 'severity', 'style'],
      modal: ['basic', 'severity', 'style']
    };
    $scope.exampleGroups = {
      Output: ['label', 'badge', 'modal']
    };
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
            text: 'badge',
            href: '#!/demo/badge',
            dropdown: [
              {
                text: 'Basic',
                href: '#!/demo/badge/basic'
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


richfacesApp.controller('DemoCtrl', [
  '$scope', '$routeParams', function($scope, $routeParams) {
    var getCode, getSource, loadFile, source;
    $scope.directiveName = $routeParams.directiveName;
    $scope.demoName = $routeParams.demoName;
    $scope.codeCache = {};
    $scope.sourceCache = {};
    $scope.list1 = ["Elem1", "Elem2", "Elem3"];
    $scope.list2 = [];
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


richfacesApp.controller('HomeCtrl', [function() {}]);
