
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
    import composantGalerie from './galerie/galerie.component'
    import composantConnexion from './connexion/connexion.component'
    //ADMIN
    import composantListerMembre from './admin/membre/membre.lister.component'
    import composantAjouterMembre from './admin/membre/ajouter/membre.ajouter.component'
    import composantModifierMembre from './admin/membre/modifier/membre.modifier.component'
    import composantListerGalerie from './admin/galerie/galerie.lister.component'
    import composantAjouterGalerie from './admin/galerie/ajouter/galerie.ajouter.component'
    import composantModifierGalerie from './admin/galerie/modifier/galerie.modifier.component'
    import composantProfil from './admin/profil/profil.component'

//Import Services
    import serviceUtilisateur from './utilisateur/utilisateur.service'
    import serviceGrade from './grade/grade.service'
    import serviceSession from './session/session.service'
    import serviceMenu from './menu/menu.service'
    import serviceGalerie from './galerie/galerie.service'
    import serviceMembre from './admin/membre/membre.service'

// Services
    import apiUrls from "./utils/apiUrls.service"
    import frontUrls from "./utils/frontUrls.service"

    angular.module('app', [
        RouteModule,
        uiBootstrap
    ])

    .value('jssha', jssha)
    .constant('apiUrls', apiUrls)
    .constant('frontUrls', frontUrls)

    //Services
    .service('serviceUtilisateur', serviceUtilisateur)
    .service('serviceSession', serviceSession)
    .service('serviceGrade', serviceGrade)
    .service('serviceMenu', serviceMenu)
    .service('serviceGalerie', serviceGalerie)
    .service('serviceMembre', serviceMembre)

    //Components
    .component('composantMenu', composantMenu)
    .component('composantPresentation', composantPresentation)
    .component('composantGalerie', composantGalerie)
    .component('composantConnexion', composantConnexion)
    //ADMIN
    .component('composantListerMembre', composantListerMembre)
    .component('composantAjouterMembre', composantAjouterMembre)
    .component('composantModifierMembre', composantModifierMembre)
    .component('composantListerGalerie', composantListerGalerie)
    .component('composantAjouterGalerie', composantAjouterGalerie)
    .component('composantModifierGalerie', composantModifierGalerie)
    .component('composantProfil', composantProfil)

    //images fallback
    .directive('errSrc', function () {
        return {
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    if (attrs.src !== attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
            }
        }
    })

    //manage connections and routes
    .config(route)
    .run([
        '$rootScope',
        '$location',
        function (
            $rootScope,
            $location) {
            $rootScope.$on('$routeChangeStart', function (event) {

            });
        }
    ]);