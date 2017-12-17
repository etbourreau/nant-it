export default class ControleurListerMembre {
    constructor($location, serviceSession, serviceMembre, serviceGrade) {
        this.location = $location
        if (!serviceSession.isAdmin()) {
            this.location.path('/')
        }
        this.id = serviceSession.getId()
        this.service = serviceMembre
        this.grades = serviceGrade

        this.membres = [
        ]
        this.refreshView()
    }

    refreshView() {
        this.service.refresh()
            .then(() => {
                this.membres = this.service.getMembres()
                this.grades.refresh()
                    .then(() => {
                        this.membres.forEach(m => {
                            m.gradeId = m.grade
                            m.grade = this.grades.getGradeParId(
                                m.grade).libelle
                        })
                    })
            })

    }

    ajouter() {
        this.location.path('/admin-membre-ajouter')
    }

    modifier(id) {
        this.service.preparerModification(id)
    }

    supprimer(id) {
        this.errorSuppression = false
        if (confirm("Êtes-vous sûr de vouloir supprimer ce membre?")) {
            this.service.supprimer(id)
                .then(result => {
                    if (result && result.status == 200) {
                        this.service.refresh()
                            .then(() => {
                                this.refreshView()
                            })

                    } else {
                        this.errorSuppression = true
                    }
                })
        }
    }
}

ControleurListerMembre.$inject = ['$location', 'serviceSession',
    'serviceMembre', 'serviceGrade']