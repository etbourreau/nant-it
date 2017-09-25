export default class ServiceGrade{
        constructor($http, apiUrls){
            this.http = $http
            this.url = apiUrls.grade
            this.grades = []
        }
        
        refresh(){
            return this.http.get(this.url, {})
                    .then(result => {
                        if(result.data){
                            this.grades = result.data
                        }else{
                            console.log('serviceGrade-refresh', 'aucune donnée récupérée')
                        }
                        return true
            }, () => {
                console.log('serviceGrade-refresh', 'connexion au serveur échouée')
                return false
            })
        }
        
        getGradeParId(id){
            return this.grades.find(g => g.id == id)
        }
        
        findAll(){
            return JSON.parse(JSON.stringify(this.grades))
        }
        
        isGradeExisteParNom(nom){
            let existe = false
            this.grades.forEach(g => {
                if(g.libelle.toLowerCase() == nom.toLowerCase()){
                    existe = true
                }
            })
            return existe
        }
        
        creer(grade){
            console.log('3', grade)
            grade.id = String(this.findIdSuivant())
            grade.priorite = String(grade.priorite)
            console.log('4', grade)
            return this.http.post(this.url, grade)
                .then(() => {
                    console.log('5')
                    return this.refresh()
                    .then(() => {
                        console.log('6', this.grades)
                        console.log('7', grade.id)
                        return (grade.id)
                    })
            })
        }
        
        findIdSuivant(){
            let id = 0
            console.log('3.33', id)
            this.grades.forEach(g => {
                if(g.id > id){
                    id = g.id
                }
            })
            console.log('3.33', id)
            return (parseInt(id)+1)
        }
}