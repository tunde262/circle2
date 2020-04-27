const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Project = require('../../models/Project');

// @route POST api/projects
// @desc Create Project
// @access Private
router.post('/', [ auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('githublink', 'Github link is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');

    try {
        const newProject = new Project({
            title: req.body.title,
            githublink: req.body.githublink,
            weblink: req.body.weblink,
            description: req.body.description,
            public: req.body.public,
            name: user.name,
            user: req.user.id
        });

        const project = await newProject.save();

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/projects/me
// @desc Ge current user's projects
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });

        if(!projects) {
            return res.status(400).json({ msg: 'There is user does not have any projects' });
        }

        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});

// @route GET api/projects
// @desc Get all Projects
// @access Public
router.get('/', async (req ,res) => {
    try {
        const projects = await Project.find({public:true}).sort({ date: -1 });

        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/projects/:id
// @desc Get project by id
// @access Private
router.get('/:id', auth, async (req ,res) => {
    try {
        const project = await Project.findById(req.params.id);

        if(!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        console.error(err.message);  
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE api/projects/:id
// @desc Delete a Project
// @access Private
router.delete('/:id', auth, async (req ,res) => {
    try {
        const project = await Project.findById(req.params.id);

        if(!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Check user
        if(project.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await project.remove();

        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.status(500).send('Server Error'); 
    }
});

// @route PUT api/projects/like/:id
// @desc Like a Project
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        // Check if project already liked by same user
        if(project.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Project already liked'});
        }

        project.likes.unshift({ user: req.user.id });

        await project.save();

        res.json(project.likes);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
})

// @route PUT api/projects/unlike/:id
// @desc Unlike a Project
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        // Check if project has been liked by same user
        if(project.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Project has not yet been liked'});
        }

        // Get remove index
        const removeIndex = project.likes.map(like => like.user.toString()).indexOf(req.user.id);

        project.likes.splice(removeIndex, 1);

        await project.save();

        res.json(project.likes);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
});

// @route POST api/projects/comment/:id
// @desc Comment on a project
// @access Private
router.post('/comment/:id', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');
    const project = await Project.findById(req.params.id);

    try {
        const newComment = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        };

        project.comments.unshift(newComment);
        await project.save()

        res.json(project.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE api/projects/comment/:id/:comment_id
// @desc Remove comment on a project
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        // Pull out comment
        const comment = project.comments.find(comment => comment.id === req.params.comment_id); // Will return comment or 'false'

        // Make sure comment exists
        if(!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // Check user is creator of post
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'})
        }

        // Get remove index
        const removeIndex = project.comments.map(comment => comment.id.toString()).indexOf(comment.id);

        project.comments.splice(removeIndex, 1);

        await project.save();

        res.json(project.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

module.exports = router;