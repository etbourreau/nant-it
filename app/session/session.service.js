export default class ServiceSession{
        constructor($http, jssha, $location, serviceUtilisateur, serviceMenu){
            this.http = $http
            this.encrypt = jssha
            this.utilisateurs = serviceUtilisateur
            this.menu = serviceMenu
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
            return this.isConnecte()
                    && this.utilisateurs.findUtilisateurParId(this.getId())
                    && this.utilisateurs.findUtilisateurParId(this.getId()).grade == '0'
        }
        
        deconnecter(){
            sessionStorage.clear()
            if(this.location.path().includes('admin')){
                this.menu.showPageContenu(false)
                this.location.path('/')
            }
        }
        
        getId(){
            return sessionStorage.getItem('id')
        }
}