var richfacesApp = angular.module('richfacesApp', ['richfaces'])
    .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'demo/views/home.html',
            controller:'HomeCtrl'
        })
        .when('/demo/:directiveName', {
            templateUrl:'demo/views/demo.html',
            controller:'DemoCtrl'
        })
        .when('/demo/:directiveName/:demoName', {
            templateUrl:'demo/views/demo.html',
            controller:'DemoCtrl'
        })
        .otherwise({
            redirectTo:'/'
        });
}])
    .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
}]);