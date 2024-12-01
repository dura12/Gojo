import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            message: "User created successfully",
            user: { id: newUser.id, username: newUser.username, email: newUser.email },
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({
            message: "Error creating user",
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (!existingUser) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        const token = jwt.sign(
            { id: existingUser.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: maxAge } // Token expires in 7 days
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            maxAge,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict",
        });

        const { password: _, ...userWithoutPassword } = existingUser;
        res.status(200).json({
            message: "Login successful",
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("auth_token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({
            message: "Error during logout",
            error: error.message,
        });
    }
};
