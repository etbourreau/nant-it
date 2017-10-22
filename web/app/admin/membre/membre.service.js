export default class ServiceMembre{
    constructor($location, serviceUtilisateur){
        this.location = $location
        this.utilisateurs = serviceUtilisateur
        
        this.membres = this.utilisateurs.findAll()
    }
    
    refresh(){
        return this.utilisateurs.refresh()
            .then(() => {
                this.membres =  this.utilisateurs.findAll()
        })
        
    }
    
    preparerModification(id){
        this.modif = JSON.parse(JSON.stringify(this.utilisateurs.findUtilisateurParId(id)))
        if(this.modif){
            this.location.path('/admin-membre-modifier')
        }else{
            console.log('serviceMembre-preparerModification', 'utilisateur inconnu')
        }
    }
    
    modifier(membre){
        this.modif = null
        return this.utilisateurs.saveUtilisateur(membre)
    }
    
    supprimer(id){
        return this.utilisateurs.supprimerUtilisateur(id)
    }
    
    ajouter(membre){
        return this.utilisateurs.saveUtilisateur(membre)
    }
    
    getMembres(){
        return JSON.parse(JSON.stringify(this.membres))
    }
}