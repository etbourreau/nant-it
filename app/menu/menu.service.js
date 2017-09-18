export default class ServiceMenu {
    constructor($timeout){
        this.timeout = $timeout
    }
        
    setPageContenu(state) {
        document.getElementById(
                'pageContenu').style.opacity = (state) ? '1' : '0'
        document.getElementById(
                'pageContenu').style.minHeight = (state) ? '50vh' : '0px'
        document.getElementById(
                'menu').style.marginTop = (state) ? '0' : '33vh'
    }

    showPageContenu(state) {
        if (state) {
            document.getElementById('menu').style.marginTop = '0';
            this.timeout(() =>
                    {
                        document.getElementById(
                                'pageContenu').style.minHeight = '50vh'
                        document.getElementById(
                                'pageContenu').style.opacity = '1'
                    }, 1000)
        } else {
            document.getElementById('pageContenu').style.opacity = '0'
            this.timeout(() =>
                    {
                        document.getElementById(
                                'pageContenu').style.minHeight = '0px'
                        document.getElementById(
                                'menu').style.marginTop = '33vh'
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
        if (page != 'accueil') {
            if (page.includes('gestion')) {
                page = 'gestion'
            }
            document.getElementById(
                    'btn-' + page).style.border = '1px solid rgba(0,0,0,0.15)'
            document.getElementById('btn-' + page).style.margin = '-1px'
        }

    }
}