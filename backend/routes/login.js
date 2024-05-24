import express from 'express';
import { User } from '../models.js';
import bcrypt from 'bcrypt';

const router = express.Router();

const roleMapping = {
    0: 'ADMIN',
    1: 'PSYCHOLOGIST',
    2: 'CLIENT'
};

router.post('/', async (req, res) => {
    console.log("login request");
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordsMatch = await comparePasswords(password, user.password);

        if (!passwordsMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json({ 
            message: "Login successful", 
            id: user._id, 
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;

const comparePasswords = async (password, userPassword) => {
    try {
        const match = await bcrypt.compare(password, userPassword);
        return match;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false; 
    }
};
    