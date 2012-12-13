richApp.controller 'DemoCtrl',['$scope', '$routeParams', ($scope, $routeParams) ->
  $scope.directiveName = $routeParams.directiveName
  $scope.demoName = $routeParams.demoName
  $scope.codeCache = {}
  $scope.sourceCache = {}


  $scope.languages = [
    'markup'
    'css'
    'javascript'
    'java'
  ]
  $scope.severities = [
    'primary'
    'success'
    'warning'
    'error'
    'danger'
    'important'
    'info'
    'inverse'
  ]
  $scope.scales = [
    'mini'
    'small'
    'medium'
    'large'
    'xlarge'
    'xxlarge'
  ]

  # Generic variables which can be used by any demo
  $scope.data =
    language: "markup"
    severity: ""
    scale: ""

    list1: ["Elem1", "Elem2", "Elem3"]
    list2: []

    input1: "value1"
    input2: "value2"
    input3: "value3"

    num1: 42
    num2: 256
    num3: 1337

  $scope.isDemo = () ->
    !!$scope.demoName

  $scope.getContentUrl = () ->
    if $scope.isDemo()
      "demo/examples/#{$scope.directiveName}/#{$scope.demoName}.html"
    else
      "demo/examples/#{$scope.directiveName}/doc.html"

  $scope.getSourceUrl = () ->
    "modules/directives/#{$scope.directiveName}/#{$scope.directiveName}.coffee"

  $scope.displayCode = () ->
    if $scope.isDemo()
      getCode($scope.directiveName, $scope.demoName)
    else
      ''

  getCode = () ->
    $scope.codeCache["#{$scope.directiveName}/#{$scope.demoName}"] = loadFile $scope.getContentUrl() if !$scope.codeCache["#{$scope.directiveName}/#{$scope.demo}"]
    $scope.codeCache["#{$scope.directiveName}/#{$scope.demoName}"]

  getSource = () ->
    $scope.sourceCache[$scope.directiveName] = loadFile $scope.getSourceUrl() if !$scope.sourceCache[$scope.directiveName]
    $scope.sourceCache[$scope.directiveName]

  loadFile = (url) ->
    result = ""
    $.when($.ajax(
      url: url,
      type: 'GET',
      async: false,
    )).then((args) ->
      result = args
    )
    result

  $scope.code = getCode()

  $scope.directive = {name: $scope.directiveName, attributes: []}
  source = getSource()

  # Parse and create directive attributes through source code
  angular.forEach source.match(/^#\s*@attribute\(.*\)*$/gm),(attributeLine) ->
    $scope.directive.attributes.push(angular.fromJson('{'+attributeLine.match(/^#\s*@attribute\((.*)\)$/)[1].replace(/(\w+)\:/g, '"$1":')+'}'))

  # Get directive properties
  # String properties
  $scope.directive.restrict = (source.match(/restrict\:\s?'([ACEM]{1,4})'/) || [])[1] || 'A'
  $scope.directive.transclude = (source.match(/transclude\:\s?'?(true|element)'?/) || [])[1]
  $scope.directive.priority = (source.match(/priority\:\s?(\d*)/) || [])[1]
  $scope.directive.require = (source.match(/require\:\s?(\d*)/) || [])[1]
  if $scope.directive.require && $scope.directive.require.indexOf('?') == 0
    $scope.directive.require = $scope.require.priority.substr(1)
    $scope.directive.requireOptional = true
  if $scope.directive.require && $scope.directive.require.indexOf('^') == 0
    $scope.directive.require = $scope.require.priority.substr(1)
    $scope.directive.requireParent = true

  # Boolean properties
  $scope.directive.replace = !!((source.match(/replace\:\s?(true|false)/) || [])[1])
  $scope.directive.terminal = !!((source.match(/terminal\:\s?(true|false)/) || [])[1])

  # Get directive description
  $scope.directive.description = (source.match(/<1-- Description((.|\n)*)--1>/) || [])[1]
  $scope.directive.description = $.trim($scope.directive.description.replace(/\n#\s/g, ' ')) if $scope.directive.description

  return
]