export default class ServiceMenu {
    constructor($timeout, serviceContact) {
        this.timeout = $timeout
        this.limites = {
            flags: {
                opacity: {
                    min: 0,
                    max: 1,
                    temps: 200
                }
            },
            logo: {
                maxWidth: {
                    min: '15%',
                    max: '80%'
                },
                marginLeft: {
                    min: '0px',
                    max: '10%',
                    temps: 200
                }
            },
            nav: {
                marginTop: {
                    min: '0px',
                    max: '40vh',
                    temps: 350
                }
            },
            page: {
                transform: {
                    min: 'scale(0, 0)',
                    max: 'scale(1, 1)',
                    temps: 750
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
        this.setTransitions(true)
        this.contact = serviceContact
    }

    getTempsTransition() {
        return this.limites.logo.marginLeft.temps + this.limites.nav.marginTop.temps + this.limites.page.transform.temps
    }

    setLogo(type) {
        if (type == 'horizontal') {
            document.getElementById('logo-' + type).style.opacity = 1
            document.getElementById('logo-vertical').style.opacity = 0
        }
        if (type == 'vertical') {
            document.getElementById('logo-' + type).style.opacity = 1
            document.getElementById('logo-horizontal').style.opacity = 0
        }
    }

    setTransitions(state) {
        document.getElementById('flags').style.transition =
            (state) ? 'opacity ' + this.limites.flags.opacity.temps + 'ms ease-in-out' : 'unset'
        document.getElementById('logo-horizontal').style.transition =
            (state) ? 'opacity ' + this.limites.logo.marginLeft.temps + 'ms ease-in-out' : 'unset'
        document.getElementById('logo-vertical').style.transition =
            (state) ? 'opacity ' + this.limites.logo.marginLeft.temps + 'ms ease-in-out' : 'unset'
        document.getElementById('logo').style.transition =
            (state) ? 'max-width ' + this.limites.nav.marginTop.temps + 'ms ease-in-out,' +
                'margin-left ' + this.limites.nav.marginTop.temps + 'ms ease-in-out' : 'unset'
        document.getElementById('menu').style.transition =
            (state) ? 'margin-top ' + this.limites.nav.marginTop.temps + 'ms ease-in-out' : 'unset'
        document.getElementById('pageContenu').style.transition =
            (state) ? 'transform ' + this.limites.page.transform.temps + 'ms ease-in-out' : 'unset'
    }

    setPageContenu(state) {
        document.getElementById('flags').style.opacity =
            (state) ? this.limites.flags.opacity.min : this.limites.flags.opacity.max
        document.getElementById('flags').style.display = (state) ? 'none' : 'flex'
        this.setLogo((state) ? 'vertical' : 'horizontal')
        document.getElementById('logo').style.maxWidth =
            (state) ? this.limites.logo.maxWidth.min : this.limites.logo.maxWidth.max
        document.getElementById('logo').style.marginLeft =
            (state) ? this.limites.logo.marginLeft.min : this.limites.logo.marginLeft.max
        document.getElementById('menu').style.marginTop =
            (state) ? this.limites.nav.marginTop.min : this.limites.nav.marginTop.max
        document.getElementById('pageContenu').style.transform =
            (state) ? this.limites.page.transform.max : this.limites.page.transform.min
        document.getElementById('pageContenu').style.minHeight =
            (state) ? this.limites.page.minHeight.max : this.limites.page.minHeight.min
    }

    showPageContenu(state) {
        if (state) {
            //enlever flags & reduire logo
            document.getElementById('flags').style.opacity = this.limites.flags.opacity.min
            document.getElementById('logo').style.marginLeft = this.limites.logo.marginLeft.min
            document.getElementById('logo').style.maxWidth = this.limites.logo.maxWidth.min
            this.timeout(() => {
                //retirer flags
                document.getElementById('flags').style.display = 'none'
                //changer logo -> vertical
                this.setLogo('vertical')
                //monter menu
                document.getElementById('menu').style.marginTop = this.limites.nav.marginTop.min
                this.timeout(() => {
                    //afficher la page
                    document.getElementById('pageContenu').style.minHeight = this.limites.page.minHeight.max
                    document.getElementById('pageContenu').style.maxHeight = this.limites.page.maxHeight.max
                    document.getElementById('pageContenu').style.transform = this.limites.page.transform.max
                }, this.limites.nav.marginTop.temps)
            }, this.limites.logo.marginLeft.temps)
        } else {
            //reduire la page
            document.getElementById('pageContenu').style.transform = this.limites.page.transform.min
            this.timeout(() => {
                //ajouter flags
                document.getElementById('flags').style.display = 'flex'
                document.getElementById('pageContenu').style.maxHeight = this.limites.page.maxHeight.min
                document.getElementById('pageContenu').style.minHeight = this.limites.page.minHeight.min
                //descendre le menu
                document.getElementById('menu').style.marginTop = this.limites.nav.marginTop.max
                this.timeout(() => {
                    //changer logo -> horizontal TODO
                    this.setLogo('horizontal')
                    //afficher flags & agrandir logo
                    document.getElementById('flags').style.opacity = this.limites.flags.opacity.max
                    document.getElementById('logo').style.maxWidth = this.limites.logo.maxWidth.max
                    document.getElementById('logo').style.marginLeft = this.limites.logo.marginLeft.max
                }, this.limites.nav.marginTop.temps)

            }, this.limites.page.transform.temps)
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

    getMessagesNonLus() {
        return this.contact.refresh()
            .then(() => {
                return this.contact.getNonLus()
            })
    }
}

ServiceMenu.$inject = ['$timeout', 'serviceContact']