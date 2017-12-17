import ControleurConnexion from './connexion.controller'
import TemplateConnexion from './connexion.html'

const ComposantConnexion = {
    template: TemplateConnexion,
    controller: ['$location', '$timeout', 'serviceSession', 'serviceMenu', ControleurConnexion]
};

export default ComposantConnexion;