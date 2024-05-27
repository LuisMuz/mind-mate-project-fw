import express from 'express';
import { User } from '../models.js';
import bcrypt from 'bcrypt';


const router = express.Router();

const roleMapping = {
    0: 'ADMIN',
    1: 'PSYCHOLOGIST',
    2: 'CLIENT'
};

// Ruta para crear un usuario
router.post('/', async (req, res) => {
    try {
        const { role, password, ...rest } = req.body;
        const mappedRole = roleMapping[role];
        if (!mappedRole) {
            return res.status(400).send({ error: 'Invalid role' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ ...rest, password: hashedPassword, role: mappedRole });
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta para obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta para actualizar un usuario por ID
router.patch('/:id', async (req, res) => {
    try {
        const { role, password, ...rest } = req.body;
        const updateData = { ...rest };

        if (role !== undefined) {
            const mappedRole = roleMapping[role];
            if (!mappedRole) {
                return res.status(400).send({ error: 'Invalid role' });
            }
            updateData.role = mappedRole;
        }

        if (password !== undefined) {
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Ruta para actualizar solo el nombre de un usuario por ID
router.patch('/:id/name', async (req, res) => {
    try {
        const { name } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});


// Ruta para eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route to get count of psychologists
router.get('/psychologists/count', async (req, res) => {
    try {
        const count = await User.countDocuments({ role: 'PSYCHOLOGIST' });
        res.send({ count });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route to get count of clients
router.get('/clients/count', async (req, res) => {
    try {
        const count = await User.countDocuments({ role: 'CLIENT' });
        res.send({ count });
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
