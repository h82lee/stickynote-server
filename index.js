import express from "express";
import mongoose from "mongoose";
import noteModel from "./models/notes.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/stickynote", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch(console.error);

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find().catch((err) => console.log(err));
  res.json(notes);
});

app.post("/notes/create", (req, res) => {
  const note = new noteModel({
    title: req.body.title,
    content: req.body.content,
  });
  note.save();
  res.json(note);
});

app.put("/notes/update", async (req, res) => {
  const updatedContent = req.body.updatedContent;
  const id = req.body.id;

  await noteModel
    .findByIdAndUpdate(id, { content: updatedContent })
    .then((docs) => {
      return res.send(docs);
    })
    .catch((err) => console.log(err));
});

app.delete("/notes/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await noteModel.findByIdAndDelete(id);
  res.send(result);
});

app.listen(3001, () => {
  console.log(`listening on : 3001`);
});
