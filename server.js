import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todosRouter from './routes/todoRouter.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Explicitly state the origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true // Allow credentials (cookies, etc.)
}));

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
