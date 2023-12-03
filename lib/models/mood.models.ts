import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
    text: {type: String, required: true},
    moodImage: {
        type: String, 
        required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    parentId: {
        type: String
    },
    children:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mood'
        }
    ]

});

const Mood = mongoose.models.Mood || mongoose.model('Mood', moodSchema);

export default Mood;

