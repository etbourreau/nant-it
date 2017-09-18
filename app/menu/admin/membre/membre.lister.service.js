export default class ServiceListerMembres{
    constructor(serviceUtilisateur){
        this.utilisateurs = serviceUtilisateur
        
        this.membres = []
        this.refresh()
    }
    
    refesh(){
        this.membres =  this.utilisateurs.findAll()
    }
    
    modifier(id){
        
    }
    
    supprimer(id){
        
    }
    
    ajouter(){
        
    }
}