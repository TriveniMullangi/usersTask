const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    Post_Id:{type: String,  required: true},
    Comment_Description: { type: String, required: true },
    Comment_CreatedAt:  { type: Date, default: Date.now() },
    Comment_ModifiedAt: { type: Date, default: Date.now() },
    Comment_CreatedBy :{ type: String },
    Comment_ModifiedBy : { type: String },
    Is_Deleted: {type : Number, default: 0},
});

const comment = mongoose.model('comments', commentSchema);

module.exports={
    comment : comment
}
