import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todosRouter from './routes/todoRouter.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors(
  {
      origin: ["https://psych-redux-todo.vercel.app"],
      methods: ["POST", "GET"],
      credentials: true
  }
));
app.use(express.json())

app.use("/api", todosRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
    console.log("MongoDB connected ...");
  })
  .catch((err) => console.error("MongoDB connection error:", err));
