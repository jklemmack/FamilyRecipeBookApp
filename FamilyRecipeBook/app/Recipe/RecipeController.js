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
			FilterRecipes();
			FilterCategories();
		});

		$scope.$watch('filter', function () {
			FilterRecipes();
			FilterCategories();
			SwitchToList();
		});

		$scope.$watch('masterRecipes', function () {
			FilterRecipes();
			FilterCategories();
		});

		function SwitchToList() {
			$scope.view = 'list';
		}

		function FilterRecipes() {
			var ret = [];

			for (var i = 0; i < $scope.masterRecipes.length; i++) {
				var recipe = $scope.masterRecipes[i];
				
				if ($scope.filter != '' && 
								 recipe.title.toLowerCase().indexOf($scope.filter.toLowerCase()) == -1) {
					recipe = null;
				}
				if ($scope.category != '' &&
						!recipe.categories.contains($scope.category))
					recipe = null;
				
				if (recipe) ret.push(recipe);
				
			}
			$scope.filteredRecipes = ret;
			//$scope.filteredRecipes = $scope.masterRecipes;
		}

		$scope.SelectRecipe = function (recipe) {
			$scope.selectedRecipe = recipe;
			$scope.view = 'view';
		}

		$scope.GoBack = function () {
			$scope.selectedRecipe = null;
			$scope.view = 'list';
		}

		function FilterCategories() {
			// Go through the filtered recipes and extract all categories
			var categories = [];
			//if (!$scope.filteredRecipes) return [];

			for (var i = 0; i < $scope.filteredRecipes.length; i++) {
				var r = $scope.filteredRecipes[i];
				for (var j = 0; j < r.categories.length; j++) {
					if (!categories[r.categories[j]])
						categories[r.categories[j]] = 0;
					categories[r.categories[j]]++;
				}
			}

			var ret = [];
			var keys = Object.keys(categories);
			for (var i = 0; i < keys.length; i++) {
				ret.push({
					"name": keys[i],
					"count": categories[keys[i]]
				});
			}

			$scope.filteredCategories = ret;

			/*			$scope.filteredCategories = [{
					"name": "All",
					"count": "15"
				}, {
					"name": "Soups",
					"count": "3"
				}];*/
		}

	}]);