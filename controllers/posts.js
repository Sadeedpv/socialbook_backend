import mongoose from "mongoose";
import PostModel from "../models/Postmodel.js"

export const getPosts = async (req, res) => {
    try{
        const AllPosts = await PostModel.find();
        res.status(200).json(AllPosts);

    }catch(err){
        res.status(500).json(err);
    }
}

export const addPosts = async (req, res) => {
    const { title, caption, creator, selectedFile, tags } = req.body;
    const newPost = new PostModel({ title, caption, creator, selectedFile, tags });
    try{
        await newPost.save();  
        res.status(200).json(newPost);
    }
    catch(err){
        res.status(404).json(err);
    }
}

export const likePost = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try{
        const post = await PostModel.findById(id);
        const updatedPost = await PostModel.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});
        res.json(updatedPost);

    }
    catch(err){
        res.status(500).json(err);
    }
}

export const selectPost = async (req, res) =>{
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try{
        const post = await PostModel.findById(id);
        res.json(post);
    }catch(err){
        res.status(404).json(err);
    }
    
}

export const updatePost = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const { title, caption, creator, tags, selectedFile } = req.body;

    try{
        const updatedPost = { _id: id, title, caption, creator, tags, selectedFile};
        await PostModel.findByIdAndUpdate(id, updatedPost, { new: true });

        res.json(updatedPost);

    }catch(err){
        res.status(500).json(err);
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try{
        await PostModel.findByIdAndDelete(id);
        res.json({ message: "Post deleted" });

    }catch(err){
        res.status(500).json(err);
    }
}

export const addComment = async (req, res) => {
    const id = req.params.id;
    // Add comment to the database
    const { creator, comment } = req.body;
    const newComment = { creator, comment };
    try{
        const post = await PostModel.findById(id);
        post.comments.push(newComment);
        await post.save();
        res.json(post);
    }catch(err){
        res.status(500).json(err);
    }
}