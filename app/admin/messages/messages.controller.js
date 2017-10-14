export default class ControleurMessages {
    constructor($location, serviceSession, serviceContact) {
        if (!serviceSession.isConnecte()) {
            $location.path('/')
        }

        this.service = serviceContact
        this.session = serviceSession

        this.refresh()
        this.service.setTousLus()
    }

    refresh() {
        this.service.refresh()
            .then(() => {
                this.messages = this.service.findAll()
                this.messages.forEach(msg => {
                    msg.date = msg.date.split('T')[0]+' '+msg.date.split('T')[1].split('.')[0]
                })
            })

    }
}