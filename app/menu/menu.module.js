import ngRoute from 'angular-route'

// Components
import menuComponent from "./menu.component"


const menuModule = angular
    .module('menuModule', [ngRoute])
    .component('menuComponent', menuComponent)

export default menuModule