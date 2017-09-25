export default class ControleurProfil {
    constructor($location, $timeout, jssha, serviceSession, serviceUtilisateur,
        serviceGrade) {
        if (!serviceSession.isConnecte()) {
            $location.path('/')
        }
        this.timeout = $timeout
        this.encrypt = jssha
        this.timeAlert = 3000

        this.service = serviceUtilisateur
        this.session = serviceSession
        this.grades = serviceGrade

        this.refreshInformations()
    }

    refreshInformations() {
        this.service.refresh()
            .then(() =>
            {
                this.utilisateur = this.service.findUtilisateurParId(
                    this.session.getId())
                this.grades.refresh()
                    .then(() =>
                    {
                        this.utilisateur.grade = this.grades.getGradeParId(
                            this.utilisateur.grade).libelle
                    })
            })

    }
    isInvalidFormInformations() {
        return !this.utilisateur.description
    }
    
    resetInformationsAlerts(){
        this.errorFormInformations = false
        this.errorFormInformationsUtilisateurInconnu = false
        this.errorFormInformationsModifier = false
        this.successFormInformations = false
    }

    modifierInformations() {
        this.resetInformationsAlerts()

        if (this.isInvalidFormInformations()) {
            this.errorFormInformations = true
        } else {
            if (!this.utilisateur.competences) {
                !this.utilisateur.competences
            }
            let utilisateur = this.service.findUtilisateurParId(
                this.utilisateur.id)
            utilisateur.description = this.utilisateur.description
            utilisateur.competences = this.utilisateur.competences
            this.service.saveUtilisateur(utilisateur)
                .then(result =>
                {
                    if (result.error) {
                        this.errorFormInformationsUtilisateurInconnu = true
                    } else {
                        this.successFormInformations = true
                    }
                }, () =>
                {
                    this.errorFormInformationsModifier = true
                })
        }
        
        this.timeout(() => {
            this.resetInformationsAlerts()
        }, this.timeAlert)
    }
    
    checkPwdForm(actual){
        let valid = true
        
        //actual empty
        if (!this.pwdActuel) {
            this.errorPwdActualEmpty = true
            this.errorPwd = true
            valid = false
        }

        //actual invalid
        if (valid) {
            let checkPwdActuel = new this.encrypt('SHA-384', 'TEXT')
            checkPwdActuel.update(this.pwdActuel)
            checkPwdActuel = checkPwdActuel.getHash('HEX')
            if (checkPwdActuel != actual) {
                this.errorPwdActuelInvalide = true
                this.errorPwd = true
                valid = false
            }
        }


        //new empty
        if (valid && !this.pwdNouveau) {
            this.errorPwdNouveauEmpty = true
            this.errorPwd = true
            valid = false
        }

        //new too short
        if (valid && this.pwdNouveau.length < 5) {
            this.errorPwdNouveauCourt = true
            this.errorPwd = true
            valid = false
        }

        //no confirmation
        if (valid && !this.pwdConfirmation) {
            this.errorPwdConfirmationEmpty = true
            this.errorPwd = true
            valid = false
        }

        //confirmation invalid
        if (valid && this.pwdNouveau != this.pwdConfirmation) {
            this.errorPwdConfirmationDifferent = true
            this.errorPwd = true
            valid = false
        }
        
        return valid
    }
    
    resetPwdAlerts(){
            this.successPwd = false
            this.errorPwdUtilisateurInvalide = false
            this.errorPwd = false
            this.errorPwdSave = false
            this.errorPwdActualEmpty = false
            this.errorPwdActuelInvalide = false
            this.errorPwdNouveauEmpty = false
            this.errorPwdNouveauCourt = false
            this.errorPwdConfirmationEmpty = false
            this.errorPwdConfirmationDifferent = false
    }

    modifierMotDePasse() {
        this.resetPwdAlerts()
        let valid
        let utilisateur
        if(this.service.findUtilisateurParId(this.utilisateur.id)){
            utilisateur = this.service.findUtilisateurParId(this.utilisateur.id)
            valid = this.checkPwdForm(utilisateur.pwd)
        }else{
            this.errorPwdUtilisateurInvalide = true
            valid = false
        }

        //success
        if (valid) {
            let newPwd = new this.encrypt('SHA-384', 'TEXT')
            newPwd.update(this.pwdNouveau)
            utilisateur.pwd = newPwd.getHash('HEX')
            this.successPwd = true
            this.disablePwdButton = true
            this.service.saveUtilisateur(utilisateur)
                .then(() => {
                    this.service.refresh()
                        .then(() => {
                            this.disablePwdButton = false
                    })
                    this.emptyPwdChamps()
                },() => {
                    this.errorPwdSave = true
                })
        }
        
        //reset alerts
        this.timeout(() => {
            this.resetPwdAlerts()
        }, this.timeAlert)
    }
    
    emptyPwdChamps(){
        this.pwdActuel = ''
        this.pwdNouveau = ''
        this.pwdConfirmation = ''
    }
}