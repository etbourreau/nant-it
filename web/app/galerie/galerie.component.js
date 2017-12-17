import './style.css'
import ControleurGalerie from './galerie.controller'
import TemplateGalerie from './galerie.html'

const ComposantGalerie = {
    template: TemplateGalerie,
    controller: ['serviceGalerie', ControleurGalerie]
};

export default ComposantGalerie