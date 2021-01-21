exports.getHome = (req, res, next) => {
  res.render('home/home', {});
};


exports.getRoadmaps = (req, res, next) => {
    res.render('roadmaps/roadmap', {});
  };
  
