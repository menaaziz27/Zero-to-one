const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      description: {
        type: String,
        required: [true, "Please enter the description"],
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    //   likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    //   likesCount: {
    //     type: Number,
    //     default: 0,
    //   },
    //   comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }],
    //   commentsCount: {
    //     type: Number,
    //     default: 0,
    //   },
});

module.exports = mongoose.model('Post', postSchema);
