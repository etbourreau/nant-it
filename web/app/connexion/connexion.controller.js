export default class ControleurConnexion {
    constructor($location, $timeout, serviceSession, serviceMenu) {
        if (serviceSession.isConnecte()) {
            $location.path('/')
        }
        this.location = $location
        this.timeout = $timeout
        this.session = serviceSession
        this.menu = serviceMenu
        
        this.alertsTime = 1000
    }

    tryConnecter(email, pwd) {
        this.resetAlerts()
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
        this.timeout(() => {
            this.resetAlerts()
        }, this.alertsTime)
    }
    
    resetAlerts(){
        this.error = false
        this.errorEmpty = false
    }
}

ControleurConnexion.$inject = ['$location', '$timeout', 'serviceSession', 'serviceMenu']