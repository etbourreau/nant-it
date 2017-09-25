export default class ServiceMenu {
    constructor($timeout) {
        this.timeout = $timeout
        this.tempsTransition = 1500
        this.setTransitions(true)
        
        this.limites = {
            nav : {
                marginTop: {
                    min : '0px',
                    max: '33vh'
                }
            },
            page : {
                transform: {
                    min: 'scale(0, 0)',
                    max : 'scale(1, 1)'
                },
                minHeight: {
                    min: '0px',
                    max: '50vh'
                },
                maxHeight: {
                    min: '0px',
                    max: 'none'
                }
            }
        }
    }
    
    setTransitions(state){
        document.getElementById('menu').style.transition =
            (state)? 'margin-top ' + (this.tempsTransition / 2) + 'ms' : 'unset'
        document.getElementById('pageContenu').style.transition =
            (state)? 'transform ' + (this.tempsTransition / 2) + 'ms ease' : 'unset'
    }

    setPageContenu(state) {
        document.getElementById('pageContenu').style.transform =
            (state) ? this.limites.page.transform.max : this.limites.page.transform.min
        document.getElementById('pageContenu').style.minHeight =
            (state) ? this.limites.page.minHeight.max : this.limites.page.minHeight.min
        document.getElementById('menu').style.marginTop =
            (state) ? this.limites.nav.marginTop.min : this.limites.nav.marginTop.max
    }

    showPageContenu(state) {
        if (state) {
            document.getElementById('menu').style.marginTop = this.limites.nav.marginTop.min
            this.timeout(() =>
            {
                document.getElementById('pageContenu').style.minHeight = this.limites.page.minHeight.max
                document.getElementById('pageContenu').style.maxHeight = this.limites.page.maxHeight.max
                document.getElementById('pageContenu').style.transform = this.limites.page.transform.max
            }, 1000)
        } else {
            document.getElementById('pageContenu').style.transform = this.limites.page.transform.min
            this.timeout(() =>
            {
                document.getElementById('pageContenu').style.maxHeight = this.limites.page.maxHeight.min
                document.getElementById('pageContenu').style.minHeight = this.limites.page.minHeight.min
                document.getElementById('menu').style.marginTop = this.limites.nav.marginTop.max
            }, 1000)
        }
    }

    setBtnActive(page) {
        let lis = document.getElementsByTagName('li')
        for (let i = 0; i < document.getElementsByTagName('li').length; i++) {
            lis[i].style.border = '0'
            lis[i].style.borderRadius = '5px'
            lis[i].style.margin = '0'
        }
        if (page.includes('gestion')) {
            page = 'gestion'
        }
        if (page != 'accueil' && document.getElementById(
            'btn-' + page)) {
            document.getElementById(
                'btn-' + page).style.border = '1px solid rgba(0,0,0,0.15)'
            document.getElementById('btn-' + page).style.margin = '-1px'
        }

    }
}