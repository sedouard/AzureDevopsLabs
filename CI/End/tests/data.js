var assert = require("assert");
var data = require('../data/recipesData.js');

////////////////////////////////////////////////////////////////////////////////
//Sample tests for Continuous Integration for the data source
///////////////////////////////////////////////////////////////////////////////
describe('data', function(){
  describe('#getRecipes()', function(){
    it('should return a list of recipes with at lest 1 recipe', function(){
      var bbqRecipes = data.getRecipes('bbq');
      var brunchRecipes = data.getRecipes('brunch');
      var dessertRecipes = data.getRecipes('dessert');

      console.log(bbqRecipes);
      console.log(brunchRecipes);
      console.log(dessertRecipes);
      var result = bbqRecipes.list.length > 0;

      assert.equal(true, result);
    })
  })
})