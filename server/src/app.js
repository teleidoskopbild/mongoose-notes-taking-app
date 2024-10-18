import express, { json } from "express";
import cors from "cors";
import db from "./util/db-connect.js";
import User from "./models/User.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.post("/users", async (req, res) => {
  const data = req.body;
  console.debug(data);
  const user = new User(data);
  await user.save();
  res.json({ success: true });
});

app.get("/users", async (req, res) => {
  const result = await User.find({});
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
});
