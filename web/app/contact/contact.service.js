export default class ServiceContact {
    constructor($http, apiUrls) {
        this.http = $http
        this.url = apiUrls.message
    }

    refresh() {
        return this.http.get(this.url)
            .then(result =>
            {
                if (result.data) {
                    this.messages = result.data
                } else {
                    console.log('ServiceContact-refresh:',
                        'aucune donnée récupérée')
                }
                return true
            }, () =>
            {
                console.log('ServiceContact-refresh:',
                    'connexion au serveur échouée')
                return false
            })

    }
    
    findAll(){
        return JSON.parse(JSON.stringify(this.messages))
    }

    getNonLus() {
        let nb = 0;
        this.messages.forEach(msg =>
            {
                if (msg.nouveau) {
                    nb++
                }
            })
        return nb
    }

    saveMessage(message) {
        message.id = this.findIdSuivant()
        message.nouveau = true
        message.date = new Date()
        return this.http.post(this.url, message)
    }

    findIdSuivant() {
        let id = 0
        this.messages.forEach(msg =>
        {
            if (msg.id > id) {
                id = msg.id
            }
        })
        return (parseInt(id) + 1)
    }

    setTousLus() {
        if (this.messages) {
            this.messages.forEach(msg =>
                {
                    if (msg.nouveau) {
                        msg.nouveau = false
                        this.http.put(this.url + '/' + msg.id, msg)
                    }
                })
        }

    }
}