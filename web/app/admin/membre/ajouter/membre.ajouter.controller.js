export default class ControleurAjouterMembre {
    constructor($location, serviceMembre, serviceGrade, serviceSession,
        serviceString) {
        this.location = $location
        if (!serviceSession.isAdmin()) {
            this.location.path('/')
        } else {
            this.service = serviceMembre
            this.serviceGrade = serviceGrade
            this.format = serviceString

            this.refreshGrades()
            this.utilisateur = {}
            if (!serviceSession.isAdmin()) {
                this.location.path('/')
            }
            this.utilisateur.grade = this.grades[0].id
        }

    }

    refreshGrades() {
        this.grades = this.serviceGrade.findAll()
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
                .then((id) =>
                    {
                        this.refreshGrades()
                        this.utilisateur.grade = id
                    })
        }
    }

    valider() {
        this.errorEmpty = false
        this.error = false
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
            this.service.ajouter(this.utilisateur)
                .then((result) =>
                    {
                        if (result.error) {
                            console.log(result.message)
                            this.error = true
                        } else {
                            this.service.refresh()
                                .then(() =>
                                    {
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
        this.location.path('/admin-membres')
    }
}

ControleurAjouterMembre.$inject = ['$location', 'serviceMembre',
    'serviceGrade', 'serviceSession', 'serviceString']