export default class MenuCtrl {
    constructor($timeout, frontUrls, $location, serviceMenu, serviceSession) {
        this.timeout = $timeout
        this.frontUrls = frontUrls
        this.location = $location
        this.service = serviceMenu
        this.session = serviceSession
        if (this.location.path() != '/') {
            let lienValide = false
            for (let k in this.frontUrls) {
                if (this.frontUrls[k] != '/'
                    && this.location.path()
                    .includes(this.frontUrls[k])) {
                    lienValide = true
                    this.service.setBtnActive(k)
                }
            }
            this.service.setPageContenu(lienValide)
        } else {
            this.service.setPageContenu(false)
        }
        
        this.timeout(() => {
            if(this.location.path() == '/'
                && document.getElementById('pageContenu').style.transform == 'scale(1, 1)'){
                this.service.setTransitions(false)
                this.service.setPageContenu(false)
                this.timeout(() => {
                    this.service.setTransitions(true)
                }, 1)
                
            }
        }, 1)

    }

    rediriger(page) {
        if (!this.mouvement) {
            this.mouvement = true

            if (page == 'accueil' && document.getElementById(
                'pageContenu').style.minHeight == this.service.limites.page.minHeight.max) {
                this.service.showPageContenu(false)
                this.timeout(() =>
                    {
                        this.location.path(this.frontUrls[page])
                        this.mouvement = false
                    }, this.service.getTempsTransition())
            } else if (page != 'accueil'
                && document.getElementById('pageContenu').style.minHeight == this.service.limites.page.minHeight.min) {
                this.location.path(this.frontUrls[page])
                this.service.showPageContenu(true)
                this.timeout(() =>
                    {
                        this.mouvement = false
                    }, this.service.getTempsTransition())
            } else {
                this.location.path(this.frontUrls[page])
                this.mouvement = false
            }
            this.service.setBtnActive(page)
        }
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