const User = require('../models/User');


exports.getProfile =  (req, res, next) => {
  let name
  let bio
  let Image
      if(req.user){
         name = req.user.name
         bio = req.user.bio
         Image = req.user.Image
      }else{
         name = null
         bio = null
         Image = null
      }
      res.render('profile/profile',{
      name: name,
      bio: bio,
      Image:Image
      })
  
}
 
exports.getUpdateProfile =  (req, res, next) =>{
  let userid
  if(req.user){
    userid = req.user._id
 }else{
    userid= null
 }
       res.render('profile/edit-profile',
       {
        userid : userid
       })
       

}
exports.postUpdateProfile = async(req, res, next) =>{
  const userid = req.body.userid
  const name = req.body.name
  const bio = req.body.bio
  const country = req.body.country
  const YOB = req.body.date_of_birth
  const gender = req.body.gender
  const skill1 = req.body.skill1
  const skill2 = req.body.skill2
  console.log(country)
  console.log(YOB)
  console.log(gender)
  console.log(skill1)
  console.log(skill2)
  const image = req.file
  const Image= image.path
  try{
  const user = await User.findOne({_id : userid})
     user.name = name
     user.bio = bio
     if(image){
       user.Image = Image
     }
     user.save()
     res.redirect('/profile')
  }
  catch(e){
    console.log(e)
  }
}

