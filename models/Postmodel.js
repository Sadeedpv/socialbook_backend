import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: String,
    caption: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    comments:[{
        creator: String,
        comment: String
    }],
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostModel = mongoose.model('PostModel', PostSchema);

export default PostModel;