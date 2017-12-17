import './style.css'
import ControleurAjouterMembre from './membre.ajouter.controller'
import TemplateAjouterMembre from './membre.ajouter.html'

const ComposantAjouterMembre = {
    template: TemplateAjouterMembre,
    controller: ['$location', 'serviceMembre',
        'serviceGrade', 'serviceSession', 'serviceString', ControleurAjouterMembre]
};

export default ComposantAjouterMembre