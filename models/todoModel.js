import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
    todo: {
        type: String,
        required: true
    }

});

export default mongoose.model('Note', NotesSchema);
