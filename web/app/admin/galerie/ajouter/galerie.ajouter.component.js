import './style.css'
import ControleurAjouterGalerie from './galerie.ajouter.controller'
import TemplateAjouterGalerie from './galerie.ajouter.html'

const ComposantAjouterGalerie = {
    template: TemplateAjouterGalerie,
    controller: ['$location', 'serviceGalerie',
        'serviceSession', 'serviceString', ControleurAjouterGalerie]
}

export default ComposantAjouterGalerie