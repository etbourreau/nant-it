export default class ControleurListerGalerie {
    constructor($location, serviceSession, serviceGalerie) {
        this.location = $location
        if (!serviceSession.isAdmin()) {
            this.location.path('/')
        }
        this.service = serviceGalerie

        this.items = [
        ]
        this.refreshView()
    }

    refreshView() {
        this.service.refresh()
            .then(() =>
                {
                    this.items = this.service.findAll()
                })
    }

    ajouter() {
        this.location.path('/admin-galerie-ajouter')
    }

    modifier(id) {
        this.service.preparerModification(id)
    }

    supprimer(id) {
        this.errorSuppression = false
        if (confirm("Êtes-vous sûr de vouloir supprimer cet élément?")) {
            this.service.supprimerItem(id)
                .then(result =>
                {
                    if (result && result.status == 200) {
                        this.service.refresh()
                            .then(() =>
                                {
                                    this.refreshView()
                                })

                    } else {
                        this.errorSuppression = true
                    }
                })
        }
    }
}

ControleurListerGalerie.$inject = ['$location', 'serviceSession',
    'serviceGalerie']