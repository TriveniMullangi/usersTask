const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    First_Name: { type: String, required: true },
    Last_Name: { type: String, required: true },
    Email: { type: String,required: true },
    password: { type: String, required: true },
    Profile_Picture: { type: String, required: true },
    Is_Deleted: { type: Number, default: 0},
    
});




const user = mongoose.model('users', userSchema);


module.exports={
    user:user
}
