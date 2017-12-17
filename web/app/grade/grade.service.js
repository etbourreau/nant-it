export default class ServiceGrade {
    constructor($http, apiUrls) {
        this.http = $http
        this.url = apiUrls.grade
        this.grades = []
    }

    refresh() {
        return this.http.get(this.url, {})
            .then(result => {
                if (result.data) {
                    this.grades = result.data
                } else {
                    console.log('serviceGrade-refresh', 'aucune donnée récupérée')
                }
                return true
            }, () => {
                console.log('serviceGrade-refresh', 'connexion au serveur échouée')
                return false
            })
    }

    getGradeParId(id) {
        return this.grades.find(g => g.id == id)
    }

    findAll() {
        return JSON.parse(JSON.stringify(this.grades))
    }

    isGradeExisteParNom(nom) {
        let existe = false
        this.grades.forEach(g => {
            if (g.libelle.toLowerCase() == nom.toLowerCase()) {
                existe = true
            }
        })
        return existe
    }

    creer(grade) {
        grade.id = String(this.findIdSuivant())
        grade.priorite = String(grade.priorite)
        return this.http.post(this.url, grade)
            .then(() => {
                return this.refresh()
                    .then(() => {
                        return (grade.id)
                    })
            })
    }

    supprimer(id) {
        return this.http.delete(this.url + '/' + id)
            .then(() => {
                return this.refresh()
            })
    }

    findIdSuivant() {
        let id = 0
        this.grades.forEach(g => {
            if (g.id > id) {
                id = g.id
            }
        })
        return (parseInt(id) + 1)
    }
}

ServiceGrade.$inject = ['$http', 'apiUrls']