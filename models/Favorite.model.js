const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema({
    favoritedPet: {
        type: Schema.Types.ObjectId, ref: 'Pet'
},
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
})

const Favorite = model("Favorite", favoriteSchema);
module.exports = Favorite;
