//connection between the backend and the database
import mongoose from "mongoose";
import express from "express";
import routes from "./routes/notesRoutes.js"; //importing routes
import cors from 'cors';
const app = express();
const PORT = 8008;

app.use(express.json())

app.use(cors());
app.options('*',cors());

app.use("/notes", routes); //Setting  a global endpoint

app.listen(PORT, () => {
  console.log(`Server Connected at ${PORT}`);
});

const url =
"mongodb+srv://debasish:debasish@Notes.jeh1ylh.mongodb.net/?retryWrites=true&w=majority";

async function dbConnect() {
  await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDb");
    })
    .catch((err) => {
      console.error(err);
    });
}

dbConnect();
