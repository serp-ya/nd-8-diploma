'use strict';
angular.module('App')
  .component('orderCard', {
    templateUrl: './app/OrderComponents/OrderCard.html',
    bindings: {
      item: '<',
      state: '<'
    }
  });