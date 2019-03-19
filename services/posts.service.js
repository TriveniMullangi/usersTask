const userModel = require('../model/user.model');
const postModel = require('../model/post.model');
const commentModel = require('../model/comment.model');

var getPosts = async (req,res,next)=>{
    try{
        return await postModel.post.find({Is_Deleted : 0 })
        .then(async postData=>{
            let finalPostsData=[],userData,user={};
            for(let i in postData){
                userData = await userModel.user.find({Email: postData[i].Post_CreatedBy, Is_Deleted : 0 });
                user.First_Name = userData[0].First_Name;
                user.Last_Name = userData[0].Last_Name;
                user.Email = userData[0].Email;
                user.Profile_Picture = userData[0].Profile_Picture;
                user.Post_Id = postData[i]._id.toString();
                user.Post_Content = postData[i].Post_Content;
                user.Post_Picture  = postData[i].Post_Picture;
                finalPostsData.push(user);
                user={};
            }
            res.send(finalPostsData);
        })
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    getPosts : getPosts
}