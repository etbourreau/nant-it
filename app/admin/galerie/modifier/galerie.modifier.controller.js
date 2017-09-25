export default class ControleurModifierMembre {
    constructor($location, serviceGalerie, serviceSession) {
        this.location = $location
        if (!serviceSession.isAdmin()) {
            this.location.path('/')
        } else {

            this.service = serviceGalerie

            this.item = this.service.modif
            if (this.item.image == 'none') {
                this.item.image = ''
                this.noImage = true
            }
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
            if (this.image) {
                this.item.image = this.image
            }
            this.service.saveItem(this.item)
                .then((result) =>
                {
                    if (result.error) {
                        console.log(result.message)
                        this.error = true
                    } else {
                        this.service.refresh()
                            .then(() =>
                            {
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