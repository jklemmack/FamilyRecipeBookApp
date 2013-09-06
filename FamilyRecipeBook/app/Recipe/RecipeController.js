'use strict';

angular.module('myApp.Recipe', ['myApp.RecipeService'])
	.controller('RecipeList', ['$scope', '$http', 'recipes',
		function($scope, $http, recipes) {
			var x = recipes.getRecipes(null, null);
		}])
;