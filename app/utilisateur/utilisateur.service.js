export default class ServiceUtilisateur {
    constructor($http, jssha, apiUrls) {
        this.http = $http
        this.encrypt = jssha
        this.url = apiUrls.utilisateur
        this.defaultPassword = 'nant-it'
        this.utilisateurs = [
        ]
        this.refresh()
    }

    refresh() {
        return this.http.get(this.url)
            .then(result =>
                {
                    if (result.data) {
                        this.utilisateurs = result.data
                    } else {
                        console.log('ServiceUtilisateur-refresh:',
                            'aucune donnée récupérée')
                    }
                    return true
                }, () =>
                {
                    console.log('ServiceUtilisateur-refresh:',
                        'connexion au serveur échouée')
                        
                    return false
                })
    }

    findAll() {
        return JSON.parse(JSON.stringify(this.utilisateurs))
    }

    findUtilisateurParId(id) {
        let utilisateur = this.utilisateurs.find(u => u.id == id)
        return (utilisateur)?JSON.parse(JSON.stringify(utilisateur)):null
    }

    findUtilisateurParEmailEtPwd(email, pwd) {
        let utilisateur = this.utilisateurs.find(u =>
            u.email == email
                && u.pwd == pwd
        )
        return (utilisateur)?JSON.parse(JSON.stringify(utilisateur)):null
    }

    findIdSuivant() {
        let id = 0
        this.utilisateurs.forEach(u =>
            {
                if (u.id > id) {
                    id = u.id
                }
            })
        return (parseInt(id) + 1)
    }

    saveUtilisateur(utilisateur) {
        if (utilisateur.id) { //MODIFY
            let u = this.findUtilisateurParId(utilisateur.id)
            if (u) {
                for (let k in utilisateur) {
                    u[k] = utilisateur[k]
                }
                return this.http.put(this.url+'/'+u.id, u)
            } else {
                return new Promise(resolve =>
                    resolve({
                        error: true,
                        message: 'ServiceUtilisateur-save: utilisateur n\'a pas pu être modifié (introuvable)'
                    }))
            }
        } else { //CREATE
            utilisateur.id = this.findIdSuivant()
            
            let pwdObj = new this.encrypt('SHA-384', 'TEXT')
            pwdObj.update(this.defaultPassword)
            utilisateur.pwd = pwdObj.getHash('HEX')
            
            return this.http.post(this.url, utilisateur)
        }
        this.refresh()
    }
    
    supprimerUtilisateur(id){
        return this.http.delete(this.url+'/'+id)
    }
}