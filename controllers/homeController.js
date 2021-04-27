const axios = require('axios');
const moment = require('moment');
const User = require('../models/User');
const Post = require('../models/Post');
const Roadmap = require('../models/Roadmap');
const { renderUsers, generateCriteriaObject } = require('../middleware/helper');
const POSTS_PER_PAGE = 4;

exports.getHome = async(req, res, next) => {
    let userid;
    if (req.user) {
        userid = req.user._id.toString();
    } else {
        userid = null;
    }

    const roadmaps = await Roadmap.find({});
    res.render('home/index', { userid, roadmaps });
};
exports.getTimeline = async(req, res, next) => {
    const page = +req.query.page || 1;
    const data = await axios.get('https://dev.to/api/articles');
    const news = data.data;
    let userid;
    if (req.user) {
        userid = req.user._id.toString();
    } else {
        userid = null;
    }
    try {
        const numPosts = await Post.find().countDocuments();
        totalItems = numPosts;
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate('user')
            .skip((page - 1) * POSTS_PER_PAGE)
            .limit(POSTS_PER_PAGE);

        const usersCount = await User.find({}).countDocuments();
        const roadmapsCount = await Roadmap.find({}).count();
        const postCount = posts.length;
        res.render('home/timeline', {
            userid: userid,
            posts,
            moment,
             news,
            postCount,
            usersCount,
            roadmapsCount,
        });
    } catch (e) {
        console.log(e);
    }
};
exports.getTimeline = async(req, res, next) => {
    const data = await axios.get('https://dev.to/api/articles');
    const news = data.data;
    let userid;
    if (req.user) {
        userid = req.user._id.toString();
    } else {
        userid = null;
    }
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 }).populate('user');
        const usersCount = await User.find({}).countDocuments();
        const roadmapsCount = await Roadmap.find({}).countDocuments();
        const postCount = posts.length;
        res.render('home/timeline', {
            userid: userid,
            moment,
            news,
            posts,
            postCount,
            usersCount,
            roadmapsCount,
            user: req.session.user,
            postDetail: false,
        });
    } catch (e) {
        console.log(e);
    }
};

exports.getNews = async(req, res) => {
    const data = await axios.get('https://dev.to/api/articles');

    const news = data.data;
    res.render('news', {
        title: 'News',
        news: news,
    });
};

exports.getSearch = async(req, res) => {
    try {
        const roadmaps = await Roadmap.find({});
        res.render('search/final_search.ejs', {
            users: [],
            roadmaps,
        });
    } catch (e) {
        console.log(e);
    }
};

exports.postSearch = async(req, res, next) => {
    //TODO-1: extract both data from ajax and from the form
    //TODO-2: format both objects to match each others
    //TODO-3: format the query that gonna undergoes to the search in DB
    //TODO-4: get the list of users that match this query or criteria
    //TODO-5: adjust the ejs cards for users
    //TODO-6: make a loading spinner that loads before rendering users to the client

    let name, yearOfBirth, language, country, gender, skills, body;
    if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
        allData = req.body.allData;
    } else {
        allData = req.body;
        // if skills length is 1 that means it has one value which will be string
        if (typeof allData.skills === 'string') {
            allData.skills = [allData.skills];
        }
        if (allData.skills === undefined) {
            allData.skills = [];
        }
    }
    console.log(allData, 'alldataaaaaaaaaaaaaaaaaaaaaa');
    allData = generateCriteriaObject(allData);
    console.log(allData, 'QUERY DATAAAAAAA');

    try {
        const users = await User.find(allData, { password: 0 });
        const roadmaps = await Roadmap.find({});
        console.log(users);

        //TODO-1: check if the  request is ajax create string of matched elements in backticks string
        //TODO-2: send users back to ajax and target the DOM element and replace it's HTML with the string
        //TODO-3: if the request not ajax just res.render with the list of returning users
        let matchedUsers;
        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
            // TODO-1: chck if the users array is empty => let matchedList = ''
            // TODO-1: if it's not empty loop with map() and send matched
            if (users.length !== 0) {
                matchedUsers = users.map(renderUsers).join('');
            } else {
                matchedUsers = '';
            }
            res.send({ users: matchedUsers });
        } else {
            res.render('search/final_search.ejs', {
                users,
                roadmaps,
            });
        }
    } catch (e) {
        console.log(e);
    }
};

exports.getSearchPosts = (req, res) => {
    res.render('search/searchPosts.ejs', {
        modifiedPosts: '',
        posts: [],
        moment,
    });
};

exports.postSearchPosts = async(req, res) => {
    const { query } = req.body;
    try {
        const page = +req.query.page || '1';
        console.log(page);
        const allPosts = await Post.aggregate([{
            $match: {
                $or: [{
                        description: {
                            $regex: query,
                            $options: 'i',
                        },
                    },
                    {
                        hashtags: {
                            $regex: query,
                            $options: 'i',
                        },
                    },
                    {
                        hashtag: {
                            $in: [query],
                        },
                    },
                ],
            },
        }, ]);
        const numPosts = await Post.find().countDocuments();
        totalItems = numPosts;
        //! this line is tricky :D
        const posts = await Post.populate(allPosts, { path: 'user' });
        res.render('search/searchPosts.ejs', {
            posts,
            moment,
            hasNextPage: POSTS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / POSTS_PER_PAGE),
        });
    } catch (e) {
        console.log(e);
    }
};