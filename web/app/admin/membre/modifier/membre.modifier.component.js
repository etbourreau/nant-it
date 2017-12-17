import './style.css'
import ControleurModifierMembre from './membre.modifier.controller'
import TemplateModifierMembre from './membre.modifier.html'

const ComposantModifierMembre = {
    template: TemplateModifierMembre,
    controller: ['$location', 'serviceMembre',
        'serviceGrade', 'serviceSession', 'serviceString', ControleurModifierMembre]
};

export default ComposantModifierMembre