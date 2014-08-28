/**
    This is the data source for your application. In the real world, you would either get this data from a data base or
    from an API 
**/

var recipeTypeName = {
    bbq: 'Barbeque Recipes',
    dessert: 'Dessert Recipes',
    brunch: 'Brunch Recipes'
}

exports.recipeTypeName = recipeTypeName; 

var data = {
    bbq : [
        {
        name: 'Make-It-Mine Pork Kabobs',
        ingredients: ["1 pound boneless pork loin or tenderloin",
            "1 Onion",
            "1 Zuchhini",
            "1 Shitake Mushroom"
        ],
        photo : 'http://images.media-allrecipes.com/userphotos/250x250/01/07/80/1078019.jpg'
        },
        {
        name: 'San Diego Grilled Chicken',
        ingredients: ["1 pound boneless pork loin or tenderloin",
                "1 Onion",
                "1 Zuchhini",
                "1 Shitake Mushroom"
            ],
        photo : 'http://images.media-allrecipes.com/userphotos/250x250/00/62/02/620268.jpg'
        },
        {
        name: 'Italian Chicken Marinade',
        ingredients: ["1 pound boneless pork loin or tenderloin",
                "1 Onion",
                "1 Zuchhini",
                "1 Shitake Mushroom"
            ],
        photo : 'http://images.media-allrecipes.com/userphotos/250x250/00/66/59/665982.jpg'
        },
        {
        name: 'Spicy Grilled Chicken',
        ingredients: ["1 pound boneless pork loin or tenderloin",
                "1 Onion",
                "1 Zuchhini",
                "1 Shitake Mushroom"
            ],
        photo : 'http://images.media-allrecipes.com/userphotos/250x250/00/83/42/834228.jpg'
        }
    ],
    brunch : [
    {
        name: 'Breakfast Scones',
        ingredients: ["1 pound boneless pork loin or tenderloin",
                "1 Onion",
                "1 Zuchhini",
                "1 Shitake Mushroom"
            ],
        photo : 'http://images.media-allrecipes.com/userphotos/250x250/00/01/71/17102.jpg'
        },
        {
        name: 'Veggie-Bean Brunch Casserole',
        ingredients: ["1 pound boneless pork loin or tenderloin",
                "1 Onion",
                "1 Zuchhini",
                "1 Shitake Mushroom"
            ],
        photo : 'http://images.media-allrecipes.com/userphotos/250x250/00/88/68/886877.jpg'
        },
        {
        name: 'Brunch Omelet Torte',
        ingredients: ["1 pound boneless pork loin or tenderloin",
                "1 Onion",
                "1 Zuchhini",
                "1 Shitake Mushroom"
            ],
        photo : 'http://images.media-allrecipes.com/userphotos/250x250/00/47/89/478979.jpg'
        },
            {
            name: 'Sunday Brunch Bake',
            ingredients: ["1 pound boneless pork loin or tenderloin",
                    "1 Onion",
                    "1 Zuchhini",
                    "1 Shitake Mushroom"
                ],
            photo : 'http://images.media-allrecipes.com/userphotos/250x250/00/98/50/985032.jpg'
        }
    ],
    dessert : [
        {
            name: 'Red, White and Blue Strawberry Shortcake',
            ingredients: ["1 Cake",
                    "1 Red",
                    "1 Whit",
                    "1 Shitake Mushroom"
                ],
            photo : 'http://images.media-allrecipes.com/userphotos/250x250/00/97/60/976034.jpg'
        },
            {
            name: 'All American Trifle',
            ingredients: ["1 pound boneless pork loin or tenderloin",
                    "1 Onion",
                    "1 Zuchhini",
                    "1 Shitake Mushroom"
                ],
            photo : 'http://images.media-allrecipes.com/userphotos/250x250/01/17/91/1179163.jpg'
        },
            {
            name: 'Scrumdiddlyuptious Ice Pops',
            ingredients: ["1 Block of Ice",
                    "1 Scumptious Pop",
                    "1 Great Attitudue",
                    "2 Hands"
                ],
            photo : 'http://images.media-allrecipes.com/userphotos/250x250/01/01/40/1014067.jpg'
        },
            {
            name: 'Summertime Cookies',
            ingredients: ["1 pound boneless pork loin or tenderloin",
                    "1 Onion",
                    "1 Zuchhini",
                    "1 Shitake Mushroom"
                ],
            photo : 'http://images.media-allrecipes.com/userphotos/250x250/00/17/84/178425.jpg'
        }
    ]
}

exports.bbq = data.bbq;
exports.brunch = data.brunch;
exports.dessert = data.dessert;

exports.getRecipes = function(kind) {

        return {
            list: data[kind],
            kind: recipeTypeName[kind]
        }
}