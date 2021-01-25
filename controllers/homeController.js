const axios = require('axios');
const moment = require('moment');

const Post = require('../models/Post')

exports.getHome = (req, res, next) => {
    let userid;
    if(req.user){
        userid = req.user._id.toString()  
    }else{
        userid =null
    }
    res.render('home/index', { userid })
};

exports.getTimeline = async (req, res, next) => {
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

      res.render('home/timeline', {
          news: news,
          userid : userid,
          posts,
          moment
      })
    } catch(e) {
        console.log(e)
    }
};


exports.getRoadmaps = (req, res, next) => {
    res.render('roadmaps/roadmap', {});
};
  

exports.getNews = async (req,res) => {
    const data = await axios.get("https://dev.to/api/articles");

    const news = data.data;
    res.render('news', {
        title: 'News',
        news: news
    })
}