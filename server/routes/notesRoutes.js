import express from "express";
//importing the functions..
import { createNote, getAll , getById, updateNote, deleteNote} from "../controllers/notesController.js";

const route = express.Router();

//hit n call
route.post("/create",createNote);  //combining the function with a url = API
route.get("/get",getAll);
route.get("/get/:id",getById); //colon is being used to set the param of the requested url
route.put("/update/:id",updateNote);
route.delete("/delete/:id",deleteNote);

export default route;