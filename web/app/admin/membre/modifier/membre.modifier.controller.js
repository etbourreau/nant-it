export default class ControleurModifierMembre {
    constructor($location, serviceMembre, serviceGrade, serviceSession,
        serviceString) {
        this.location = $location
        if (!serviceSession.isAdmin()) {
            this.location.path('/')
        } else {
            this.service = serviceMembre
            this.serviceGrade = serviceGrade
            this.session = serviceSession
            this.format = serviceString

            this.utilisateur = this.service.modif
            this.refreshGrades()
        }
    }

    refreshGrades() {
        this.grades = this.serviceGrade.findAll()
    }

    uploaderImage() {
    }

    isImageValide() {
    }

    isSelf() {
        return (this.utilisateur) ? this.utilisateur.id == this.session.getId() : false
    }

    creerGrade() {
        this.errorEmptyGrade = false
        this.errorExistingGrade = false
        if (!this.nouveauGrade || !this.nouveauGrade.nom || !this.nouveauGrade.priorite) {
            this.errorEmptyGrade = true
        } else if (this.serviceGrade.isGradeExisteParNom(
            this.nouveauGrade.nom)) {
            this.errorExistingGrade = true
        } else {
            let pluriel = this.nouveauGrade.pluriel ? this.nouveauGrade.pluriel : this.nouveauGrade.nom + 's'
            this.serviceGrade.creer({
                id: 0,
                priorite: this.nouveauGrade.priorite,
                libelle: this.nouveauGrade.nom,
                pluriel: pluriel
            })
                .then((id) => {
                    this.refreshGrades()
                    this.utilisateur.grade = id
                })
        }
    }

    valider() {
        this.errorEmpty = false
        if (this.isInvalidForm()) {
            this.errorEmpty = true
        } else {
            this.utilisateur.image =
                this.format.formatAccents(
                    this.utilisateur.prenom.toLowerCase())
                + '-'
                + this.format.formatAccents(this.utilisateur.nom.toLowerCase())
                + '.jpg'

            this.utilisateur.email =
                this.format.formatAccents(
                    this.utilisateur.prenom.toLowerCase())
                + '.'
                + this.format.formatAccents(this.utilisateur.nom.toLowerCase())
                + '@nant-it.fr'

            if (!this.utilisateur.competences) {
                this.utilisateur.competences = ''
            }
            this.service.modifier(this.utilisateur)
                .then((result) => {
                    if (result.error) {
                        console.log(result.message)
                        this.error = true
                    } else {
                        this.service.refresh()
                            .then(() => {
                                this.location.path('/admin-membres')
                            })
                    }
                })
        }
    }

    isInvalidForm() {
        return !this.utilisateur.nom
            || this.utilisateur.nom.includes(' ')
            || !this.utilisateur.prenom
            || this.utilisateur.prenom.includes(' ')
            || !this.utilisateur.description
            || this.utilisateur.grade == '+'
    }

    annuler() {
        this.service.modif = null
        this.location.path('/admin-membres')
    }
}

ControleurModifierMembre.$inject = ['$location', 'serviceMembre',
    'serviceGrade', 'serviceSession', 'serviceString']