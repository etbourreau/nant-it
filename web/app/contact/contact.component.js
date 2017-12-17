import ControleurContact from './contact.controller'
import TemplateContact from './contact.html'

const ComposantContact = {
    template: TemplateContact,
    controller: ['$timeout', 'serviceContact', ControleurContact]
};

export default ComposantContact;