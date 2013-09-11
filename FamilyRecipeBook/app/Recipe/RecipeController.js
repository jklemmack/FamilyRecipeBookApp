'use strict';

angular.module('myApp.Recipe', ['myApp.RecipeService'])
	.controller('RecipeList', ['$scope', '$http', '$log', 'Recipes', function ($scope, $http, $log, Recipes) {

		// The explicit text typed in the search box
		$scope.filter = '';

		// The list of recipes to display
		$scope.recipes = [];

		//The selected category
		$scope.category = '';

		// The list of categories to display
		$scope.filteredCategories = [];

		// The currently selected recipe
		$scope.selectedRecipe = null;

		// Whether we are viewing the recipe list or a specific recipe
		$scope.view = 'list';
        
        $scope.$watch('recipes', function(newValue, oldValue) {
            FilterCategories();
        });
        
        $scope.$watch('filter', function(newValue, oldValue) {
           $scope.recipes = Recipes.getRecipes($scope.category, $scope.filter)
            .then(function(response) {
                    FilterCategories(response);
                    return response;
                });
        });

        $scope.$watch('category', function(newValue, oldValue) {
           $scope.recipes = Recipes.getRecipes($scope.category, $scope.filter); 
        });

        
		$scope.recipes = Recipes.getRecipes(null, null);
        
		function SwitchToList() {
			$scope.view = 'list';
		}

		$scope.SelectRecipe = function (recipe) {
			$scope.selectedRecipe = recipe;
			$scope.view = 'view';
		}

		$scope.GoBack = function () {
			$scope.selectedRecipe = null;
			$scope.view = 'list';
		}

        $scope.SelectCategory = function(category)
        {
            $scope.category = category;
            var x = $(".cat:" + category);
        }
        
		function FilterCategories(recipes) {
			// Go through the filtered recipes and extract all categories
			var categories = [];
            
			for (var i = 0; i < recipes.length; i++) {
				var r = recipes[i];
				for (var j = 0; j < r.categories.length; j++) {
					if (!categories[r.categories[j]])
						categories[r.categories[j]] = 0;
					categories[r.categories[j]]++;
				}
			}

            // Rebuild as an array of name / count pair objects
			var ret = [];
			var keys = Object.keys(categories);
			for (var i = 0; i < keys.length; i++) {
				ret.push({
					"name": keys[i],
					"count": categories[keys[i]]
				});
			}

			$scope.filteredCategories = ret;
		}

	}]);