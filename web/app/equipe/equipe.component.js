import './style.css'
import ControleurEquipe from './equipe.controller'
import TemplateEquipe from './equipe.html'

const ComposantEquipe = {
    template: TemplateEquipe,
    controller: ['serviceUtilisateur', 'serviceGrade', ControleurEquipe]
};

export default ComposantEquipe