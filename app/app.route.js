export function route ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
    .when('/', {
        template: '<menu-component></menu-component>'
    })
    .otherwise({
        redirectTo: '/'
    });

}
