import './style.css'
import ControleurProfil from './profil.controller'
import TemplateProfil from './profil.html'

const ComposantProfil = {
    template: TemplateProfil,
    controller: ['$location', '$timeout', 'jssha', 'serviceSession',
        'serviceUtilisateur', 'serviceGrade', ControleurProfil]
};

export default ComposantProfil