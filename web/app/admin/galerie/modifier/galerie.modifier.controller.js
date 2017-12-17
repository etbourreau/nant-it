export default class ControleurModifierMembre {
    constructor($location, serviceGalerie, serviceSession) {
        this.location = $location
        if (!serviceSession.isAdmin()) {
            this.location.path('/')
        } else {

            this.service = serviceGalerie

            this.item = this.service.modif
        }
    }

    valider() {
        this.errorEmpty = false
        if (this.noImage) {
            this.image = 'none'
        }
        if (this.isInvalidForm()) {
            this.errorEmpty = true
        } else {
            this.item.image = this.format.formatAccents(this.item.titre.toLowerCase().
                trim())
            while (this.item.image.includes(' ')) {
                this.item.image = this.item.image.replace(' ', '-')
            }
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
        this.service.modif = null
        this.location.path('/admin-galerie')
    }
}

ControleurModifierMembre.$inject = ['$location', 'serviceGalerie',
    'serviceSession']