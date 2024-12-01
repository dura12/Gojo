import express from "express";
import authroute from "./route/auth.route.js";
import postroute from "./route/post.route.js"; // Ensure this path is correct
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors({ origin: "http://localhost:5173" , credentials:true }));
app.use(express.json())
app.use(cookieParser())
// Root route to handle GET requests to /
app.get("/", (req, res) => {
    res.send("Welcome to the Express app!");  // A simple response for the root route
});
app.use("/api/auth", authroute);
// Use your postroute module for the /test endpoint (if that's where it's defined)
app.use("/api/posts", postroute);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
