
//Import Basic/Core
import angular from 'angular'
import RouteModule from 'angular-route'
import 'bootstrap/dist/css/bootstrap.css'
import './css/style.css'
import uiBootstrap from 'angular-ui-bootstrap'
import { route } from './app.route'
import jssha from 'jssha'

//Import Components
import composantMenu from './menu/menu.component'
import composantConnexion from './connexion/connexion.component'

//Import Services
import serviceUtilisateur from './utilisateur/utilisateur.service'
import serviceSession from './session/session.service'

// Services
import apiUrls from "./utils/apiUrls.service"
import frontUrls from "./utils/frontUrls.service"

angular.module('app', [RouteModule, uiBootstrap])

    .value('jssha', jssha)
    .constant('apiUrls', apiUrls)
    .constant('frontUrls', frontUrls)

    //Services
	.service('serviceUtilisateur', serviceUtilisateur)
	.service('serviceSession', serviceSession)

    //Components
    .component('composantMenu', composantMenu)
    .component('composantConnexion', composantConnexion)

    //manage connections and routes
    .config(route)
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function (event) {
        
    });
}]);