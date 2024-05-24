import express from "express";
import { PORT, mongoURI } from "./db.js";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import PsychologistProfile from "./routes/psychologistProfileRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import notesRoute from "./routes/notesRoute.js";
import sessionRoute from "./routes/sessionRoute.js";
import loginUser from "./routes/login.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/login", loginUser)
app.use("/users", userRoute);
app.use("/psychologistProfile", PsychologistProfile);
app.use("/appointments", appointmentRoute);
app.use("/notes", notesRoute);
app.use("/sessions", sessionRoute);

mongoose 
    .connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB!");
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}!`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("This is the MindMate app!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  