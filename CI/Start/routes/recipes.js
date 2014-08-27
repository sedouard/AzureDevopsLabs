var recipes = require('../data/recipesData.js');

exports.list = function (req, res) {
    //get the name of the kind of recipes that was requested
    var kind = req.params.id;

    res.render('recipes', {
        recipes: recipes.getRecipes(kind)
    });

}