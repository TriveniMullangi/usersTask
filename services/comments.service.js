var HTTP_CODES = require('../util/statusCodes');
const userModel = require('../model/user.model');
const postModel = require('../model/post.model');
const commentModel = require('../model/comment.model');

var getComments=  (req,res,next)=>{
    try{

            return  postModel.post.find({_id:req.query.postId, Is_Deleted : 0 })
            .then(async postData=>{
               return await commentModel.comment.find({Post_Id: postData[0]._id.toString(), Is_Deleted : 0 });
            })
            .then(async commentData=>{
                let finalCommentsData=[],user={},userData, comment={};
                for (let i in commentData){
                    userData = await userModel.user.find({Email: commentData[i].Comment_CreatedBy, Is_Deleted : 0 })
                    user.First_Name = userData[0].First_Name;
                    user.Last_Name = userData[0].Last_Name;
                    user.Profile_Picture = userData[0].Profile_Picture;
                    user.Comment_Description = commentData[i].Comment_Description;
                    finalCommentsData.push(user);
                    user={};
                }
                comment.TotalComments = finalCommentsData.length;
                comment.Comments= finalCommentsData
                res.send(comment)
            })     
    }
    catch(err){
        next(err)
    }
 }

 module.exports ={
    getComments : getComments
 }