import jwt from "jsonwebtoken"
export const verifyToken =(req , res,next) =>{
    const token = req.cookies.auth_token; // Ensure you match the cookie name used during login
    if (!token) return res.status(401).json({ message: "Not Authenticated" });
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) return res.status(401).json({ message: "Token Not Valid" }); 
      req.userId = payload.id
      next()
    });
}
