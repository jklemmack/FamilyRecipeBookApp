'use strict';

angular.module('myApp', ['ui.router', 'myApp.Recipe'])
	.config(['$routeProvider', 
			function($routeProvider)
	{
	}])
/*.run(['$rootScope', '$state', '$stateParams',
			function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])*/
;