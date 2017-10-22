export default class ControleurEquipe {
    constructor(serviceUtilisateur, serviceGrade) {
        this.service = serviceUtilisateur
        this.serviceGrade = serviceGrade

        this.listGrades = []
        this.listItems = []
        if (this.service.utilisateurs.length > 0 && this.serviceGrade.grades.length > 0) {
            this.refreshVue()
        }
        this.serviceGrade.refresh()
            .then(() =>
            {
                this.refreshVue()
            })
    }

    refreshVue() {
        this.listGrades = this.serviceGrade.findAll()
        this.listGrades.sort((a, b) =>
        {
            return a.priorite - b.priorite
        })
        this.listGrades.forEach(g =>
        {
            this.listItems[g.id] = this.service.findUtilisateursParIdGrade(
                g.id)
        })
        this.setClassesEtCompetences()
    }

    setClassesEtCompetences() {
        let currentPos = 0 //0->gauche / 1->droite
        this.listGrades.forEach(g =>
        {
            this.listItems[g.id].forEach(u =>
            {
                //competences
                u.competences = u.competences.split(';')
                for (let i = 0; i < u.competences.length; i++) {
                    u.competences[i] = u.competences[i].trim()
                }
                if (u.competences.length == 1 && u.competences[0] == "") {
                    u.competences = [
                    ]
                }
                //position
                if (currentPos == 1) {
                    u.classImg = 'col-xs-push-9'
                    u.classTxt = 'col-xs-pull-3 text-right'
                }
                currentPos = currentPos == 0 ? 1 : 0
            })
        })
    }
}

ControleurEquipe.$inject = ['serviceUtilisateur', 'serviceGrade']