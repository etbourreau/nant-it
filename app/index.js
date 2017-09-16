
// Basic/Core
import angular from 'angular'
import RouteModule from 'angular-route'
import 'bootstrap/dist/css/bootstrap.css'
import uiBootstrap from 'angular-ui-bootstrap'
import { route } from './app.route'


//Components
//import varCOmponent from './url/to/file'

// Services
import apiUrls from "./utils/apiUrls.service"
import frontUrls from "./utils/frontUrls.service"

//Modules
import menuModule from './menu/menu.module'


angular.module('app', [RouteModule, menuModule.name, uiBootstrap])

    .constant("apiUrls", apiUrls)
    .constant("frontUrls", frontUrls)

    //Services
	//.service('nameService', varService)

    //Components
    //.component('nameComponent', varComponent)

    //manage connections and routes
    .config(route)
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function (event) {
        
    });
}]);