exports.getProfile = (req,res) => {
    res.render('profile/profile', {
        user: req.session.user
    })
}


exports.getEditProfile = (req,res) => {
    res.render('profile/edit-profile')
}