export default class ServiceGrade{
        constructor($http, apiUrls){
            this.http = $http
            this.url = apiUrls.grade
            this.refresh()
            this.grades = []
        }
        
        refresh(){
            this.http.get(this.url, {})
                    .then(result => {
                        if(result.data){
                            this.grades
                        }else{
                            console.log('serviceGrade-refresh', 'aucune donnée récupérée')
                        }
            }, () => {
                console.log('serviceGrade-refresh', 'connexion au serveur échouée')
            })
        }
        
        getGradeParId(id){
            return this.grades.find(g => g.id == id)
        }
}