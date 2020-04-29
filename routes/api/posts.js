const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Post = require('../../models/Post');

// @route POST api/posts
// @desc Create Post
// @access Private
router.post('/', [ auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');

    try {
        const newPost = new Post({
            title: req.body.title,
            text: req.body.text,
            name: user.name,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/posts/me
// @desc Ge current user's posts
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id });

        if(!posts) {
            return res.status(400).json({ msg: 'There is user has not written any posts' });
        }

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});

// @route GET api/posts
// @desc Get all Posts
// @access Public
router.get('/', async (req ,res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Private
router.get('/:id', auth, async (req ,res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);  
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE api/posts/:id
// @desc Delete a Post
// @access Private
router.delete('/:id', auth, async (req ,res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check user
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error'); 
    }
});

// @route PUT api/posts/like/:id
// @desc Like a Post
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post already liked by same user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked'});
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
})

// @route PUT api/posts/unlike/:id
// @desc Unlike a Post
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post already liked by same user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked'});
        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
});

// @route POST api/posts/comment/:id
// @desc Comment on a post
// @access Private
router.post('/comment/:id', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    try {
        const newComment = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        };

        post.comments.unshift(newComment);
        await post.save()

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Remove comment on a post
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    const post = await Post.findById(req.params.id);

    try {
        const post = await Post.findById(req.params.id);

        // Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id); // Will return comment or 'false'

        // Make sure comment exists
        if(!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // Check user is creator of post
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'})
        }

        // Get remove index
        const removeIndex = post.comments.map(comment => comment.id.toString()).indexOf(comment.id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

module.exports = router;