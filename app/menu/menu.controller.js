export default class MenuCtrl {
	constructor(frontUrls, $location) {
		this.frontUrls = frontUrls
		this.$location = $location

	}

	rediriger(a) {
        switch (a) {
            default:
                this.$location.path(this.frontUrls.home)
                break;
        }
	}

}



MenuCtrl.$inject = [
	'frontUrls',
	'$location'
]