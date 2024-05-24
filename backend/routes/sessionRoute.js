import express from 'express';
import { Session } from '../models.js';

const router = express.Router();

// Ruta para crear una sesión
router.post('/', async (req, res) => {
    try {
        const session = new Session(req.body);
        await session.save();
        res.status(201).send(session);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Ruta para eliminar una sesión por ID
router.delete('/:id', async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) {
            return res.status(404).send();
        }
        res.send(session);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
