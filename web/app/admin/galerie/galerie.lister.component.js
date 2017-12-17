import './style.css'
import ControleurListerGalerie from './galerie.lister.controller'
import TemplateListerGalerie from './galerie.lister.html'

const ComposantListerGalerie = {
    template: TemplateListerGalerie,
    controller: ['$location', 'serviceSession',
        'serviceGalerie', ControleurListerGalerie]
};

export default ComposantListerGalerie