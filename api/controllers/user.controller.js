import prisma from "../lib/prisma.js"

export const getUsers = async (req, res) => {
    try {
      // Use the correct Prisma method to fetch all users
      const users = await prisma.user.findMany(); // `user` corresponds to the model name in your Prisma schema
      res.status(200).json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ message: "Error fetching users", error: err.message });
    }
  };
  

export const getUser = async (req, res) => {
    try {
      const { id } = req.params; // Get user ID from request parameters
  
      const user = await prisma.user.findUnique({
        where: { id },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ message: "Error fetching user", error: err.message });
    }
  }
  export const updateUser = async (req, res) => {
    try {
      const id = req.params.id;
      const tokenUserid = req.userId;
      if (id !== tokenUserid){
        return res.status(403).json({message:"Not authorized"})
      }
      
      const body = req.body; // Get update fields from request body
  
      const updatedUser = await prisma.user.update({
        where: { id },
        data: body,
      });
  
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    }
     catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ message: "Error updating user", error: err.message });
    }
  };
  

  export const deleteUser = async (req, res) => {
    try { 
        const id = req.params.id;
        const tokenUserid = req.userId;
        if (id !== tokenUserid){
          return res.status(403).json({message:"Not authorized"})
        }
        
      const deletedUser = await prisma.user.delete({
        where: { id },
      });
  
      res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser,
      });
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ message: "Error deleting user", error: err.message });
    }
  };


