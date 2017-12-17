export default class ServiceGalerie {
    constructor($http, $location, apiUrls) {
        this.http = $http
        this.location = $location
        this.url = apiUrls.galerie
        this.galerie = [
        ]
        this.refresh()
    }

    refresh() {
        return this.http.get(this.url)
            .then(result => {
                if (result.data) {
                    this.galerie = result.data
                } else {
                    console.log('ServiceGalerie-refresh:',
                        'aucune donnée récupérée')
                }
            }, () => {
                console.log('ServiceGalerie-refresh:',
                    'connexion au serveur échouée')
            })
    }

    findAll() {
        return JSON.parse(JSON.stringify(this.galerie))
    }

    findItemParId(id) {
        let item = this.galerie.find(u => u.id == id)
        return (item) ? JSON.parse(JSON.stringify(item)) : null
    }

    findIdSuivant() {
        let id = 0
        this.galerie.forEach(i => {
            if (i.id > id) {
                id = i.id
            }
        })
        return (parseInt(id) + 1)
    }

    preparerModification(id) {
        this.modif = JSON.parse(JSON.stringify(this.findItemParId(id)))
        if (this.modif) {
            this.location.path('/admin-galerie-modifier')
        } else {
            console.log('serviceGalerie-preparerModification', 'utilisateur inconnu')
        }
    }

    saveItem(item) {
        if (item.id) { //MODIFY
            let i = this.findItemParId(item.id)
            if (i) {
                for (let k in item) {
                    i[k] = item[k]
                }
                return this.http.put(this.url + '/' + i.id, i)
            } else {
                return new Promise(resolve =>
                    resolve({
                        error: true,
                        message: 'ServiceGalerie-save: item n\'a pas pu être modifié (introuvable)'
                    }))
            }
        } else { //CREATE
            item.id = this.findIdSuivant()
            item.date = new Date()
            return this.http.post(this.url, item)
        }
        this.refresh()
    }

    supprimerItem(id) {
        return this.http.delete(this.url + '/' + id)
    }
}

ServiceGalerie.$inject = ['$http', '$location', 'apiUrls']