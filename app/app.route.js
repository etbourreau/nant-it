export function route ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
    .when('/', {})
    .when('/connexion', {
        template: '<composant-connexion></composant-connexion>'
    })
    .otherwise({
        redirectTo: '/'
    });

}
