export function route($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {})
        .when('/presentation', {
            template: '<composant-presentation></composant-presentation>'
        })
        //membres
        .when('/connexion', {
            template: '<composant-connexion></composant-connexion>'
        })
        .when('/admin/membres', {
            template: '<composant-admin-membres-lister></composant-admin-membres-lister>'
        })
        //redirect
        .otherwise({
            redirectTo: '/'
        });

}
