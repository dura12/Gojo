// import jwt from "jsonwebtoken";

// export const loggedin = async (req, res) => {
//   const token = req.cookies.auth_token; // Ensure you match the cookie name used during login
//   if (!token) return res.status(401).json({ message: "Not Authenticated" });

//   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
//     if (err) return res.status(401).json({ message: "Token Not Valid" });
//     return res.status(200).json({
//       message: "User Authenticated",
//       userId: payload.id, // Assuming the token contains the user's ID
//     });
//   });
// };
// export const shouldbeadmin = async (req, res, next) => {
//     const token = req.cookies.auth_token; // Ensure cookie name consistency
//     if (!token) return res.status(401).json({ message: "Not Authenticated" });
  
//     jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
//       if (err) return res.status(401).json({ message: "Token Not Valid" });
  
//       // Check if the user is an admin
//       if (!payload.isAdmin) {
//         return res.status(403).json({ message: "Access Denied: Admins Only" });
//       }
//       res.status(200).json({message:"Authenticated"})
  
//       // User is an admin, proceed to the next middleware or route
//       next();
//     });
//   };
  