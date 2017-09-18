export default class MenuCtrl {
    constructor($timeout, frontUrls, $location, serviceMenu, serviceSession) {
        this.timeout = $timeout
        this.frontUrls = frontUrls
        this.location = $location
        this.service = serviceMenu
        this.session = serviceSession
        if(this.location.path() != '/'){
            let lienValide = false
            for(let k in this.frontUrls){
                if(this.frontUrls[k]!= '/'
                        && this.location.path()
                            .includes(this.frontUrls[k])){
                    lienValide = true
                }
            }
            this.service.setPageContenu(lienValide)
        }else{
            this.service.setPageContenu(false)
        }
        
        
    }

    rediriger(page) {
        if (page == 'accueil' && document.getElementById('pageContenu').style.opacity == '1') {
            this.service.showPageContenu(false)
            this.timeout(() => {
                this.location.path(this.frontUrls[page])
            }, 1000)
        }else if(page != 'accueil' && document.getElementById('pageContenu').style.opacity == '0'){
            this.service.showPageContenu(true)
            this.timeout(() => {
                this.location.path(this.frontUrls[page])
            }, 2000)
        }else{
            this.location.path(this.frontUrls[page])
        }
        this.service.setBtnActive(page)
    }

    isConnecte() {
        return this.session.isConnecte()
    }

    isAdmin() {
        return this.session.isAdmin()
    }

    deconnecter() {
        this.session.deconnecter()
    }

}

MenuCtrl.$inject = [
    '$timeout',
    'frontUrls',
    '$location',
    'serviceMenu',
    'serviceSession'
]