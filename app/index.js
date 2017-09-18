
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
import composantPresentation from './presentation/presentation.component'
import composantConnexion from './connexion/connexion.component'

//Import Services
import serviceUtilisateur from './utilisateur/utilisateur.service'
import serviceGrade from './grade/grade.service'
import serviceSession from './session/session.service'
import serviceMenu from './menu/menu.service'

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
	.service('serviceGrade', serviceGrade)
	.service('serviceMenu', serviceMenu)

    //Components
    .component('composantMenu', composantMenu)
    .component('composantPresentation', composantPresentation)
    .component('composantConnexion', composantConnexion)

    //manage connections and routes
    .config(route)
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function (event) {
        
    });
}]);