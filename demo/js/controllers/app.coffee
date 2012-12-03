richfacesApp.controller 'AppCtrl',['$rootScope', '$scope', ($rootScope, $scope) ->
  $scope.examples =
    badge: ['basic','severity','style']
    label: ['basic','severity','style']
    modal: ['basic','severity','style']

  $scope.exampleGroups =
    Output: ['label','badge','modal']

  $scope.navbarModel = [
    {text: 'Home', href: '#!/'}
    {text: 'Input', dropdown: [
      {text: 'pickList', href: '#!/demo/pickList', dropdown: [
        {text: 'Basic', href: '#!/demo/pickList/basic'}
      ]}
    ]}
    {text: 'Output', dropdown: [
      {text: 'badge', href: '#!/demo/badge', dropdown: [
        {text: 'Basic', href: '#!/demo/badge/basic'}
      ]}
    ]}
  ]

  $scope.getDemos = (directiveName) ->
    result = []
    angular.forEach $scope.navbarModel,(topLevelLink) ->
      if topLevelLink.dropdown
        angular.forEach topLevelLink.dropdown,(link) ->
          if link.text == directiveName
            result = link.dropdown
            return
      return

    result

  return
]