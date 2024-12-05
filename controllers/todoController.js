import Note from '../models/todoModel.js';

// Get all notes
export const getTodos = async (req, res) => {
    try {
        const todos = await Note.find();
        res.json({todos});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a note
export const addTodo = async (req, res) => {
    try {
        const { todo } = req.body;
        const note = new Note({
            todo
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error("Internal Server Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Update a note
export const updateTodo = async (req, res) => {
    const { todo } = req.body;
    try {
        const newTodo = {};
        if (todo) newTodo.todo = todo;

        let todoItem = await Note.findById(req.params.id);
        if (!todoItem) return res.status(404).json({ error: "Not Found" });

        todoItem = await Note.findByIdAndUpdate(req.params.id, newTodo, { new: true });
        res.status(200).json({ todoItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a note
export const deleteTodo = async (req, res) => {
    try {
        let todo = await Note.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: "Not Found" });

        todo = await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: "Note has been deleted", todo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
