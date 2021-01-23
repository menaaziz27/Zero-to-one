const axios = require('axios');
const Post = require('../models/Post')

exports.getHome = async (req, res, next) => {
    const data = await axios.get("https://dev.to/api/articles");
    const news = data.data;
    let userid;
    if(req.user){
        userid = req.user._id.toString()  
    }else{
        userid =null
    }
    try {
      const posts = await Post.find({}).sort({ createdAt: -1 }).populate("user")
      console.log(posts)
      res.render('home/home', {
          news: news,
          userid : userid,
          posts
      })
    } catch(e) {

    }
};


exports.getRoadmaps = (req, res, next) => {
    res.render('roadmaps/roadmap', {});
};
  

exports.getNews = async (req,res) => {
    const data = await axios.get("https://dev.to/api/articles");
    console.log(data.data[0]);
    const news = data.data;
    res.render('news', {
        title: 'News',
        news: news
    })
}