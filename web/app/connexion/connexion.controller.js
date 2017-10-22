export default class ControleurConnexion {
    constructor($location, serviceSession, serviceMenu) {
        if (serviceSession.isConnecte()) {
            $location.path('/')
        }
        this.location = $location
        this.session = serviceSession
        this.menu = serviceMenu
    }

    tryConnecter(email, pwd) {
        this.error = false
        this.errorEmpty = false
        if (!email || !pwd) {
            this.errorEmpty = true
        } else {
            if (this.session.connecter(email, pwd)) {
                this.menu.showPageContenu(false)
                this.location.path('/')
            } else {
                this.error = true
            }
        }

    }
}

ControleurConnexion.$inject = ['$location', 'serviceSession', 'serviceMenu']