import { ObjectId } from "mongodb";
import { dbConnect } from "../DB/dbconnection.js";

export async function createPost(req, res){
    try{
        let dbo = await dbConnect();
        let collection = dbo.collection('posts');

        if(req.body.title && req.body.content){
            let post = {
                title: req.body.title,
                content: req.body.content,
                createdby_id: req.user._id,
                createdby_name: req.user.user_name,
                comments: [],
                delete: false
            }
            collection.insertOne(post).then(resp => {
                res.status(200).json({
                    data: resp
                })
            })
        } else {
            res.status(401)
        }
    }
    catch(err){
        res.status(500);
    }
}

export async function addComment(req, res){
    try{
        let dbo = await dbConnect();
        let collection = dbo.collection('posts');

        if(req.body.postId && req.body.comment){
            let postId = new ObjectId(req.body.postId);
            
            let post = await collection.findOne({
                "_id": postId,
                "delete": false
            }).then(resp => {
                return resp;
            });
            console.log('post is', post)
            let comment = {
                comment: req.body.comment,
                createdby_id: req.user._id,
                createdby_name: req.user.user_name,
                delete: false
            }
            post.comments.push(comment);

            collection.updateOne({
                '_id': postId,
                'delete': false
            }, {$set: {
                "comments": post.comments
            }}).then(resp=>{
                res.status(201).json({
                    data: resp
                })
            });
        } else {
            res.status(401).send('Missing inputs!!')
        }
    }
    catch(err){
        res.status(500);
    }
}