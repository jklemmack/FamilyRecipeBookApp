'use strict';

angular.module('myApp.Recipe', [])
	.controller('RecipeList', ['$scope', '$http', function ($scope, $http) {

		// The explicit text typed in the search box
		$scope.filter = '';

		// The list of recipes to display
		$scope.filteredRecipes = [];

		//The selected category
		$scope.category = '';

		// The list of categories to display
		$scope.filteredCategories = [];

		// The currently selected recipe
		$scope.selectedRecipe = null;

		// Whether we are viewing the recipe list or a specific recipe
		$scope.view = 'list';

		$scope.masterRecipes = [];

		// Get the master recipe list on load		
		$http.get('/js/recipes.js').then(function (res) {
			$scope.masterRecipes = res.data;
		});

		$scope.$watch('filter', function () {
			FilterRecipes();
			FilterCategories();
		});

		$scope.$watch('masterRecipes', function () {
			FilterRecipes();
			FilterCategories();
		});

		function FilterRecipes() {
			$scope.filteredRecipes = $scope.masterRecipes;
		}

		$scope.SelectRecipe = function(recipe)
		{
			$scope.selectedRecipe = recipe;
			$scope.view = 'view';
		}
		
		$scope.GoBack = function()
		{
			$scope.selectedRecipe = null;
			$scope.view = 'list';
		}
		
		function FilterCategories() {
			// Go through the filtered recipes and extract all categories
			/*	var categories = [];
			for(var i = 0; i < $scope.filterRecipes.length; i++)
			{
				var r = $scope.filterRecipes[i];
				for(var j = 0; j < r.categories.length; j++){
					if (!categories[r.categories[j]])
						categories.push(r.categories[j]);
					categories[r.categories[j]] += 1;
				}
			}*/

			$scope.filteredCategories = [{
					"name": "All",
					"count": "15"
				}, {
					"name": "Soups",
					"count": "3"
				}];
		}

	}]);