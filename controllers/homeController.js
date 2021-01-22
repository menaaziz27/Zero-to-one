const axios = require('axios');

exports.getHome = async (req, res, next) => {
    const data = await axios.get("https://dev.to/api/articles");
    const news = data.data;
    let userid
    if(req.user){
        userid = req.user._id.toString()  
    }else{
        userid =null
    } 
    res.render('home/home', {
        news: news,
        userid : userid
    })
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