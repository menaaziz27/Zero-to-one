const User = require('../models/User');
const Post = require('../models/Post')
const moment = require('moment');

// exports.getProfile =  (req, res, next) => {
//   let name
//   let bio
//   let Image
//       if(req.user){
//          name = req.user.name
//          bio = req.user.bio
//          Image = req.user.Image
//       }else{
//          name = null
//          bio = null
//          Image = null
//       }
//       res.render('profile/profile',{
//       name: name,
//       bio: bio,
//       Image:Image
//       })
// }


exports.getUsersProfile = async (req, res, next) => {
  
  const userId = req.params.id

  try{
    const userDoc = await User.findOne({_id : userId})
    const posts = await Post.find({ user: userId }).sort({ createdAt: "desc" })
    .populate("user");
    console.log(userDoc.websites.github)
    res.render('profile/user-profile',{
    user : userDoc,
    userId: userId,
    posts,
    moment
      })
    }
    catch(e){
      console.log(e)
    }
}
 
exports.getUpdateProfile =  (req, res, next) =>{

  let userid
  if(req.user){
    userid = req.user._id
 }else{
    userid = null
 }
  res.render('profile/edit-profile',
  {
    userid : userid
  })
}
exports.postUpdateProfile = async(req, res, next) =>{
  console.log(req.body)
  const userid = req.body.userid
  const name = req.body.name
  const bio = req.body.bio
  const country = req.body.country
  const YOB = req.body.date_of_birth
  const gender = req.body.gender
  const skills = req.body.skills
  const nativeLang = req.body.nativeLang
  const github = req.body.github;
  const linkedin = req.body.linkedin;
  const instagram = req.body.instagram;
  const twitter = req.body.twitter;
  const stackoverflow = req.body.stackoverflow;

  let image;
  let Image;
  image = req.file

  if(image !== undefined){
       Image= image.path
  }
  try{
  const user = await User.findOne({_id : userid})
     user.name = name
     user.bio = bio
     user.country = country
     user.yearOfBirth = YOB
     user.gender = gender
     if(skills !== undefined){
     user.skills = skills
     }
     user.nativeLang = nativeLang

    //  console.log(image)
     if(image !== undefined){
       user.Image = Image
     }

     let websites = [github, linkedin, stackoverflow, twitter, instagram];
     if (github === '' || linkedin === '' || stackoverflow === '' || twitter === '' || instagram === '') {
       // pop them from the websites array
       websites = websites.filter(link => link !== '');
     }
     console.log(websites)
     user.websites = websites;
     user.save()
     res.redirect('/users/profile/' + userid)
  }
  catch(e) {
    console.log(e)
  }
}

