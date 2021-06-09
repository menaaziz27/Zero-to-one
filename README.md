- [x] two home views for auth and for unAuth
- [x] auth middleware and protecting routes
- [x] post details
- [x] show skills and user data (Bio, age, date of birth, address, websites, native languages, preferrable languages)
- [x] show edit and delete posts for the user if he owns it
- [x] nav bar for the rest of views
- [x] render images with posts
- [x] if the user posted in timeline redirect him to timeline
- [x] edited post detail view to not show update option for all users
- [x] add readingTime for post model and in postCreate
- [x] hashtags and readingTime for posts
- [x] edited hashtags and readingTime for postEdit controller too
- [x] fix post detail if the current user is the owner let it textArea if not make it simple <p> tag
- [x] delete operation for posts
- [x] hide post form for all users except the owner
- [x] user edit form country and birth of year not working
- [x] redirect fix after editing form whether the user was in profile or timeline
- [x] redirect fix after Back button URL form whether the user was in profile or timeline
- [x] delete extra profile view
- [x] nativeLang in edit form and links (websites)
- [x] render the specified icons for websites
- [x] option to delete a skill added by mistake
- [x] fix error messages styles
- [x] if user pick a skill this skill will be checked in edit profile
- [x] add default name, bio and profile picture in profile view
- [x] Github api in user profile (render projects sections if the user has provided its github account url in edit form)
- [x] forms user experince by providing them their old input if there was an error while redirecting
- [x] hide user password from publicity
- [x] add default pic in user posts if it not provided
- [x] nativeLang is provided in user model but not in edit profile form
- [x] navbar layout
- [x] add validation to edit profile form
- [x] fix back button in user profile (if we in any user profile -not mine - if i click back it will redirect me to my profile)
- [x] change profile route (username unique in model, adjust ajax validation, ajust res.locals and render functions)
- [x] search page for users and posts with specific tags
- [x] search functionality by post (words - hashtags - usernames - skills - languages)
- [x] adjust roadmaps controller and rounting
- [x] adjust post card
- [x] auto initialize the default image path for newly created user
- [x] if the user submitted edit profile with no bio so don't save bio property in the record
- [x] edit & delete post ajax
- [x] separate each file with its CSS file
- [x] option to delete websites
- [x] Likes and comments system
- [x] navbar bug while redirecting from profile to roadmaps (getting smaller)
- [x] automatically generate user age after adding birth of year
- [x] delete hashtags from post description and leave them only in the hashtags
- [x] what if i posted empty post
- [X] side menu bar for navigating in home
- [] smooth scrolling & change scrollbar color ans shape
- [] add see more button to the post description
- [] restricted words in any post before creating it (npm bad-words)
- [] every skill in user profile will be a link to its roadmap in the website
- [] alert message in profile page to complete user data if it's not provided yet
- [] website locally only or globally only
- [] pagination and limiting for search page
- [] adjust db schema
- [] if there's no users in the search query return No users found .. the same in posts
- [] 404 page style
- [] what if the user enter a post with 100000 characters ? we want a see more button that goes to post details
- [] change font style
- [x] what if the admin deletes the user account he logged from
- [x] proper handling of 404 pages
- [x] dynamically render skills in forms
- [] hide user sensitive data
- [] handle errors rather than logging them to the console
- [] option for user to change his password inside the app
- [] validation for roadmaps form
- [] validation for topics form
- [x] edit profile gender fix
- [] upload image field with preview
- [] limit post characters
- [] fix scrollbar
- [X] hide update and delete button for posts that the user don't owe
- [x] search index problem (auto index when creating db)
- [] remove border from textarea
- [x] we're not using moment.js anymore now
- [] style delete button in posts
- [x] delete button in posts fire event on the button only and not the span or icon tags
- [x] replies route
- [x] likes not working properly in any user's profile
- [x] render comment count dynamically
- [x] adjust search design and logic
- [x] law deft roadmap mn gher topics w 7awelt a3mlha access hy3ml error
- [X] validation in dashborad
- [] set default or blank data in edit post form if he didn't change any data in first time
- [] fix follow button in other users proile
- [X] in user profile if the user added his information i should render them in a section maybe underneath the skills section
- [X] likes active class need to be fixed
- [X] messages page responsive layout fix
- [X] if admin deleted roadmap it gets deleted automatically from the user skills list
- [] delete post form in post submission and remain only the ajax call
- [] number of posts and comments in profile need to be fixed
- [] edit post route need to be fixed after edit
- [X] following and followers page links
- [X] prevent user of making fetch posts reqeusts if he hits the end of a page and the posts length is zero
- [] posts dashboard
- [] add client socket to following and followers page
