const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    img: {
        type: Schema.Types.ObjectId, // There is no need to create references here
        ref: 'uploads'
    },
    img_name: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    githublink: {
        type: String,
        required: true
    },
    weblink: {
        type: String
    },
    description: {
        type: String,
    },
    public: {
        type: Boolean,
        default: true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Project = mongoose.model('project', ProjectSchema);