const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    Post_Content: { type: String, required: true },
    Post_Picture: { type: String, required: true },
    Post_CreatedAt:  { type: Date, default: Date.now() },
    Post_UpdatedAt: { type: Date, default: Date.now() },
    Post_CreatedBy :{ type: String },
    Post_UpdatedBy : { type: String },
    Is_Deleted: {type : Number, default: 0},
});

const post = mongoose.model('posts', PostSchema,'posts');

module.exports={
    post : post
}
