import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const noteModel = mongoose.model("Note", noteSchema);

export default noteModel;
