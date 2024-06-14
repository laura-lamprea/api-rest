import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

async function start() {
    try {
        app.use(
            cors({
                origin: process.env.CORS_ALLOWS_ORIGIN,
                methods: ["GET", "POST", "PATCH", "DELETE"],
            })
        );

        app.use(express.json());

        require("./src/routes/index")(app);

        await mongoose.connect(process.env.MONGODB_URI!)
            .then(() => console.log('Connected to MongoDB Atlas'))
            .catch(err => console.error('Error connecting to MongoDB:', err));

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });

    } catch (error) {
        console.error("Error connecting:", error);
    }
}

start();



