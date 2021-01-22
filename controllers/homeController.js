exports.getHome = (req, res, next) => {
  let userid
  if(req.user){
    userid = req.user._id.toString()  
 }else{
    userid =null
 } 
  res.render('home/index', {
    userid : userid
  });
};
