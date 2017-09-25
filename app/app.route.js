export function route($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true)

    $routeProvider
        .when('/', {})
        .when('/presentation', {
            template: '<composant-presentation></composant-presentation>'
        })
        //membres
        .when('/connexion', {
            template: '<composant-connexion></composant-connexion>'
        })
        .when('/admin-membres', {
            template: '<composant-lister-membre></composant-lister-membre>'
        })
        .when('/admin-membre-ajouter', {
            template: '<composant-ajouter-membre></composant-ajouter-membre>'
        })
        .when('/admin-membre-modifier', {
            template: '<composant-modifier-membre></composant-modifier-membre>'
        })
        .when('/admin-galerie', {
            template: '<composant-lister-galerie></composant-lister-galerie>'
        })
        .when('/admin-galerie-ajouter', {
            template: '<composant-ajouter-galerie></composant-ajouter-galerie>'
        })
        .when('/admin-galerie-modifier', {
            template: '<composant-modifier-galerie></composant-modifier-galerie>'
        })
        .when('/admin-profil', {
            template: '<composant-profil></composant-profil>'
        })
        //redirect
        .otherwise({
            redirectTo: '/'
        });

}
