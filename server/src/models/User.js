import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  title: String,
  description: String,
});

const User = model("User", userSchema);

export default User;
