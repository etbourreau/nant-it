export default class ControleurGalerie {
    constructor(serviceGalerie) {
        this.service = serviceGalerie

        this.items = []
        if (this.service.galerie.length > 0) {
            this.refreshVue()
        }
        this.service.refresh()
            .then(() =>
            {
                this.refreshVue()
            })

    }

    refreshVue() {
        this.items = this.service.findAll()
        this.setClasses()
    }

    setClasses() {
        for (let i = 0; i < this.items.length; i = i + 2) {
            this.items[i].classImg = ''
            this.items[i].classTxt = ''
            if (this.items[i + 1]) {
                this.items[i + 1].classImg = 'col-xs-push-8'
                this.items[i + 1].classTxt = 'col-xs-pull-4'
            }
        }
    }
}

ControleurGalerie.$inject = ['serviceGalerie']