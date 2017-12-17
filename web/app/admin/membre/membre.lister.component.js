import './style.css'
import ControleurListerMembre from './membre.lister.controller'
import TemplateListerMembre from './membre.lister.html'

const ComposantListerMembre = {
    template: TemplateListerMembre,
    controller: ['$location', 'serviceSession',
        'serviceMembre', 'serviceGrade', ControleurListerMembre]
};

export default ComposantListerMembre