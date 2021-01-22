const axios = require('axios');

exports.getHome = (req, res, next) => {
  res.render('home/home', {});
};


exports.getRoadmaps = (req, res, next) => {
    res.render('roadmaps/roadmap', {});
};
  

exports.getNews = async (req,res) => {
    const data = await axios.get("https://dev.to/api/articles");
    // console.log(data.data[1]);
    const news = data.data;
    res.render('news', {
        title: 'News',
        news: news
    })
}