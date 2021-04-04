const Roadmap = require('../models/Roadmap');


exports.createRoadmap = async (req, res) => {
  // const title = req.body.title;
	// const description = req.body.description;
  // const steps = req.body.steps
	try {
		const newRoadmap = new Roadmap({
			title: title,
			description: description,
      steps : steps
		});
		await newRoadmap.save();
	} catch (e) {
		console.log(e);
	}
};

// roadmaps/:roadmap
exports.getRoadmap = async (req,res) => {
  const roadmapName = req.params.roadmap;

  try {
    const roadmap = await Roadmap.findOne({routeName: roadmapName}).populate('steps');
    console.log(roadmap)
    const steps = roadmap.steps;
    console.log(steps[0].title)
    res.render('roadmaps/diagram', {
      roadmap,
      steps
    })
  }catch(e) {
    console.log(e)
  }
}