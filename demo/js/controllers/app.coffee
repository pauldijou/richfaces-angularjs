richApp.controller 'AppCtrl',['$rootScope', '$scope', ($rootScope, $scope) ->
  $scope.navbarModel = [
    {text: 'Home', href: '#!/'}
    {text: 'Input', dropdown: [
      {text: 'pickList', href: '#!/demo/pickList', dropdown: [
        {text: 'Basic', href: '#!/demo/pickList/basic'}
      ]}
    ]}
    {text: 'Output', dropdown: [
      {text: 'label', href: '#!/demo/label', dropdown: [
        {text: 'Basic', href: '#!/demo/label/basic'}
      ]},
      {text: 'badge', href: '#!/demo/badge', dropdown: [
        {text: 'Basic', href: '#!/demo/badge/basic'},
        {text: 'Editable', href: '#!/demo/badge/editable'}
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