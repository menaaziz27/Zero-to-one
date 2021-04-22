const Roadmap = require('../models/Roadmap');

exports.getRoadmaps = async(req, res, next) => {
    try {
        const roadmaps = await Roadmap.find({});
        console.log(roadmaps);

        res.render('roadmaps/roadmaps', {
            roadmaps,
        });
    } catch (e) {
        console.log(e);
    }
};

exports.createRoadmap = async(req, res) => {
    try {
        const newRoadmap = new Roadmap({
            title: title,
            description: description,
            steps: steps,
        });
        await newRoadmap.save();
    } catch (e) {
        console.log(e);
    }
};

// roadmaps/:roadmap
exports.getRoadmap = async(req, res, next) => {
    const roadmapName = req.params.roadmap;
    let count = 1;
    try {
        const roadmap = await Roadmap.findOne({ routeName: roadmapName }).populate(
            'steps'
        );
        if (roadmap === null) {
            res.locals.error = 'this roadmap is deleted since a while.';
            next();
        }
        //! optional chaining
        console.log(roadmap);
        //!roadmap?.steps
        const steps = roadmap.steps;
        //!steps[0]?.title
        console.log(steps[0].title);
        res.render('roadmaps/diagram', {
            roadmap,
            steps,
            count,
        });
    } catch (e) {
        console.log(e);
    }
};

exports.getDiagram = (req, res) => {
    res.render('roadmaps/diagram.ejs');
};