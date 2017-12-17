import './menu.css'
import ControleurMenu from './menu.controller'
import TemplateMenu from './menu.html'

const ComposantMenu = {
    template: TemplateMenu,
    controller: ['$timeout', 'frontUrls', '$location', 'serviceMenu',
        'serviceSession', 'serviceContact', ControleurMenu]
};

export default ComposantMenu