'use strict';

angular.module('myApp.RecipeService', [])
.factory('recipes', [
    '$http',
    function($http) {
        var recipes = [];
        
        $http.get('js/recipes.json')
        .success(function(data) {
            recipes = data;
        });
        
        var factory = {}; 
        
        factory.getRecipes = function(category, search) {
            return recipes;
        }
        
        factory.getCategories = function(search) {
            return [
                {name: 'All', count: 5},
                {name: 'Soups', count:1}
            ];
        }
        
        return factory;        
    }
]);    