import express from "express";
import authroute from "./route/auth.route.js";
import postroute from "./route/post.route.js"; // Ensure this path is correct
import cookieParser from "cookie-parser";
// import testroute from "./route/test.route.js";
import userroute from "./route/user.route.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow sending cookies
  })
);

app.use(express.json())
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("Welcome to the Express app!");  // A simple response for the root route
});
app.use("/api/auth", authroute);
app.use("/api/posts", postroute);
app.use("/api/user" ,userroute);
// app.use("/test", testroute);
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
