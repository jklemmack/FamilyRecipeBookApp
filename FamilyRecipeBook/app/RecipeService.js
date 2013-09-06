'use strict';

angular.module('myApp.RecipeService', [])
.factory('recipes', [
    '$http',
    function($http) {
        var factory = {}; 
        
        $http.get('js/recipes.json')
        .success(function(data, status, headers, config) {
            //recipes = data;
        })
        .error(function(data, status, headers, config){
            
        });
        
        factory.recipes = [];
        
        factory.getRecipes = function(category, search) {
            setSearch(category, search);
            return recipes;
        }
        
        factory.getCategories = function(search) {
            setSearch(null, search);
            return [
                {name: 'All', count: 5},
                {name: 'Soups', count:1}
            ];
        }
        
        function setSearch(category, search){
            this.currentSearch = {"category": category, "search": search};
        }
        
        factory.currentSearch = {};
        factory.getSearch = function(){
            return this.currentSearch;
        }
        
        return factory;        
    }
]);    