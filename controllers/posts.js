const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
// const Comment = require("../models/Comment");

module.exports = {
  getPost: async (req, res) => {
    try {
      const post = await Post.find({userId:req.user.id});
      console.log(post)
      // const title = await Post.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", {posts: post});
      // , user: req.user, title: post.title, idea: post.idea
    } catch (err) {
      console.log(err);
    }
  },

  getNewVideo: (req,res)=>{
      res.render('newVideo.ejs')
  },

  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        idea: req.body.idea,
        postDate: req.body.date,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/feed");
    } catch (err) {
      res.redirect("/feed");
    }
  },
};