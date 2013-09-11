'use strict';

angular.module('myApp.RecipeService', [])
.service('Recipes', [
    '$http',
    function($http) {
        var factory = {}; 

        //factory.recipes = [];
        factory.search = {};

                
        factory.setSearch = function (category, search){
            this.currentSearch = {"category": category, "search": search};
        };
				
        factory.getRecipes = function(category, search) {
            return $http.get('js/recipes.js')
            .then(function(response) {
                var ret = [];
                for (var i = 0; i < response.data.length; i++)
                {
                    var include = true;
                    if (category && !searchCategory(category, response.data[i].categories))
                        include = false;
                    else if (search && !searchRecipe(search, response.data[i]))
                        include = false;
                    if (include)
                        ret.push(response.data[i]);
                }
                return ret;
            });
        };
        
        function searchRecipe(search, recipe)
        {
            return true;
        }
        
        function searchCategory(search, categories)
        {
            for (var i = 0; i < categories.length; i++)
            {
                if (categories[i].toLowerCase() == search.toLowerCase())
                    return true;
            }
            return false;
        }
        
        factory.getCategories = function(search) {
            setSearch(null, search);
            return [
                {name: 'All', count: 5},
                {name: 'Soups', count:1}
            ];
        };
        
        factory.currentSearch = {};
        factory.getSearch = function(){
            return this.currentSearch;
        }
        
        return factory;        
    }
]);    