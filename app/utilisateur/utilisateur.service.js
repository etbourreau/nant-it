export default class ServiceUtilisateur {
    constructor($http, apiUrls) {
        this.http = $http
        this.url = apiUrls.utilisateur
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
                        console.log('serviceUtilisateur-refresh',
                            'aucune donnée récupérée')
                    }
                }, () =>
                {
                    console.log('serviceUtilisateur-refresh',
                        'connexion au serveur échouée')
                })
    }

    findAll() {
        return this.utilisateurs
    }

    findUtilisateurParId(id) {
        return this.utilisateurs.find(u =>
            u.id == id)
    }

    findUtilisateurParEmailEtPwd(email, pwd) {
        return this.utilisateurs.find(u =>
            u.email == email
                && u.pwd == pwd
        )
    }

    findIdSuivant() {
        let id = 0
        this.utilisateur.forEach(u =>
            {
                if (u.id > id) {
                    id = u.id
                }
            })
        return (id + 1)
    }

    saveUtilisateur(utilisateur) {
        if (utilisateur.id) { //MODIFY
            let u = this.findUtilisateurParId(utilisateur.id)
            if (u) {
                for (let k in utilisateur) {
                    u[k] = utilisateur[k]
                }
                return this.http.put(this.url, u)
            } else {
                return new Promis(resolve =>
                    resolve({
                        error: true,
                        message: 'ServiceUtilisateur-save utilisateur n\'a pas pu être modifié (introuvable)'
                    }))
            }
        } else { //CREATE
            utilisateur.id = this.findIdMax()
            return this.http.post(this.url, utilisateur)
        }
        this.refresh()
    }
}