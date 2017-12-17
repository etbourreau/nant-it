export default class ControleurAjouterMembre {
    constructor($location, serviceGalerie, serviceSession, serviceString) {
        this.location = $location
        if (!serviceSession.isAdmin()) {
            this.location.path('/')
        }
        this.service = serviceGalerie
        this.format = serviceString

        this.item = {}
    }

    valider() {
        this.errorForm = false
        this.error = false
        if (this.isInvalidForm()) {
            this.errorForm = true
        } else {
            this.item.image = this.format.formatAccents(this.item.titre.toLowerCase().
                trim())
            while (this.item.image.includes(' ')) {
                this.item.image = this.item.image.replace(' ', '-')
            }
            this.item.image += '.jpg'
            this.service.saveItem(this.item)
                .then((result) => {
                    if (result.error) {
                        console.log(result.message)
                        this.error = true
                    } else {
                        this.service.refresh()
                            .then(() => {
                                this.location.path('/admin-galerie')
                            })
                    }
                })
        }
    }

    isInvalidForm() {
        return !this.item.titre
            || !this.item.lien
            || this.item.lien.includes(' ')
            || !this.item.description
    }

    annuler() {
        this.location.path('/admin-galerie')
    }
}

ControleurAjouterMembre.$inject = ['$location', 'serviceGalerie',
    'serviceSession', 'serviceString']