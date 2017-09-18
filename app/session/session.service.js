export default class ServiceSession{
        constructor($http, jssha, $location, serviceUtilisateur){
            this.http = $http
            this.encrypt = jssha
            this.utilisateurs = serviceUtilisateur
            this.location = $location
        }
        
        connecter(email, pwd){
            let pwdObj = new this.encrypt('SHA-384', 'TEXT')
            pwdObj.update(pwd)
            pwd = pwdObj.getHash('HEX')
            let utilisateur = this.utilisateurs.findUtilisateurParEmailEtPwd(email, pwd)
            if(utilisateur){
                sessionStorage.setItem('id', utilisateur.id)
                return true
            }else{
                return false
            }
        }
        
        isConnecte(){
            return sessionStorage.getItem('id') != null
        }
        
        isAdmin(){
            return this.isConnecte() && this.utilisateurs.findUtilisateurParId(this.get()).grade == 'Administrateur'
        }
        
        deconnecter(){
            sessionStorage.clear()
            this.location.path('/')
        }
        
        get(){
            return sessionStorage.getItem('id')
        }
}