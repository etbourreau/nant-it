export default class ControleurConnexion{
    constructor($location, serviceSession){
        this.location = $location
        this.session = serviceSession
    }
    
    tryConnecter(email, pwd){
            this.error = false
            this.errorEmpty = false
        if(!email || !pwd){
            this.errorEmpty = true
        }else{
            if(this.session.connecter(email, pwd)){
                this.location.path('/')
            }else{
                this.error = true
            }
        }
        
    }
}