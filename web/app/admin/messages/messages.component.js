import ControleurMessages from './messages.controller'
import TemplateMessages from './messages.html'

const ComposantMessages = {
    template: TemplateMessages,
    controller: ['$location', 'serviceSession', 'serviceContact', ControleurMessages]
};

export default ComposantMessages