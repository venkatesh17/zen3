const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = mongoose.Schema({
    Id: Number,
    Name: String,
    Type: String,
    Favorite: String
},{
    timestamps: true
})

UserSchema.plugin(AutoIncrement, {inc_field: 'Id', disable_hooks: true});

module.exports = mongoose.model("User", UserSchema)