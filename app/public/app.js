'use strict';

// Declare app level module which depends on views, and components
angular.module('contactApp', [
  'ngRoute',
  'firebase',
  'contactApp.contacts' 
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
