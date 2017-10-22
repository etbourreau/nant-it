export default class ControleurContact {
    constructor($timeout, serviceContact) {
        this.timeout = $timeout
        this.service = serviceContact
        this.timeAlert = 3000
        this.resetChamps()
        this.resetAlerts()
    }

    envoyerMessage() {
        if (this.isFormValid()) {
            this.service.saveMessage({
                nom: this.nom,
                prenom: this.prenom,
                email: this.email,
                tel: this.tel,
                societe: this.societe,
                message: this.message
            }).then(() =>
                {
                    this.success = true
                    this.resetChamps()
                }, () =>
                {
                    this.error = true
                    this.errorServeur = true
                })
            this.timeout(() =>
                {
                    this.resetAlerts()
                },
                this.timeAlert)
        }
    }

    resetChamps() {
        this.nom = ''
        this.prenom = ''
        this.email = ''
        this.tel = ''
        this.societe = ''
        this.message = ''
    }

    isFormValid() {
        this.resetAlerts()
        let valid = true;

        if (!this.nom || !this.prenom) {
            valid = false
            this.error = true
            this.errorEmptyNom = true
        }

        if (valid && !this.email) {
            valid = false
            this.error = true
            this.errorEmptyEmail = true
        }

        if (valid && !this.societe) {
            valid = false
            this.error = true
            this.errorEmptySociete = true
        }

        if (valid && !this.tel) {
            valid = false
            this.error = true
            this.errorEmptyTel = true
        }

        var regexTel = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/
        if (valid && !regexTel.test(this.tel)) {
            valid = false
            this.error = true
            this.errorInvalidTel = true
        }

        if (valid && !this.message) {
            valid = false
            this.error = true
            this.errorEmptyMessage = true
        }

        this.timeout(() =>
            {
                this.resetAlerts()
            },
            this.timeAlert)
        return valid
    }

    resetAlerts() {
        this.error = false
        this.errorServeur = false
        this.errorEmptyNom = false
        this.errorEmptyEmail = false
        this.errorEmptySociete = false
        this.errorEmptyTel = false
        this.errorInvalidTel = false
        this.errorEmptyMessage = false
        this.success = false
    }
}

ControleurContact.$inject = ['$timeout', 'serviceContact']