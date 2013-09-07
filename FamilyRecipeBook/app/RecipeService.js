'use strict';

angular.module('myApp.RecipeService', [])
.service('recipes', [
    '$http',
    function($http) {
        var factory = {}; 

        factory.recipes = [];

        /*$http.get('js/recipes.js')
        .success(function(data, status, headers, config) {
            //recipes = data;
            factory.recipes = data;
        })
        .error(function(data, status, headers, config){
            
        });*/
        
        $.getJSON('js/recipes.js', function(data) {
            factory.recipes = data;
        });
                
        factory.setSearch = function (category, search){
            this.currentSearch = {"category": category, "search": search};
        }
				
        factory.getRecipes = function(category, search) {
            this.setSearch(category, search);
            return this.recipes;
        }
        
        factory.getCategories = function(search) {
            setSearch(null, search);
            return [
                {name: 'All', count: 5},
                {name: 'Soups', count:1}
            ];
        }
        
        factory.currentSearch = {};
        factory.getSearch = function(){
            return this.currentSearch;
        }
        
        return factory;        
    }
]);    