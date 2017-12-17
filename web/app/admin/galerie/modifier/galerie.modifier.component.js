import './style.css'
import ControleurModifierGalerie from './galerie.modifier.controller'
import TemplateModifierGalerie from './galerie.modifier.html'

const ComposantModifierGalerie = {
    template: TemplateModifierGalerie,
    controller: ['$location', 'serviceGalerie',
        'serviceSession', ControleurModifierGalerie]
};

export default ComposantModifierGalerie