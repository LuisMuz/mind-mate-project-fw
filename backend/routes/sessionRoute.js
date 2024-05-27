import express from 'express';
import { Session, PsychologistProfile, User } from '../models.js';

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

// Ruta para eliminar una sesión por ID del cliente
router.post('/client/:id', async (req, res) => {
    try {
        const session = await Session.findOne({ client_id: req.params.id, active: true });
        console.log(session);
        if (!session) {
            return res.status(404).send({ error: 'Session not found' });
        }

        if (!session.active) {
            return res.status(400).send({ error: 'Session is not active' });
        }

        session.active = false;
        await session.save();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta para obtener el perfil del psicólogo asociado a una sesión de usuario
router.get('/user/:id', async (req, res) => {
    try {
        const session = await Session.findOne({ client_id: req.params.id, active: true });
        if (!session) {
            return res.status(404).json({ error: 'No active session found for the user.' });
        }

        const psychologistProfile = await PsychologistProfile.findOne({ psychologist_id: session.psycho_id });
        const psychoUser = await User.findOne({ _id: session.psycho_id });

        if (!psychologistProfile) {
            return res.status(404).json({ error: 'Psychologist profile not found.' });
        }

        const profileData = psychologistProfile.toObject();

        res.status(200).json({ ...profileData, name: psychoUser.name });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the psychologist profile.' });
    }
});

// Obtener todas las sessiones activas de un psicologo
router.get('/psycho/:id', async (req, res) => {
    try {
        const sessions = await Session.find({ psycho_id: req.params.id, active: true });
        if (!sessions) {
            return res.status(404).json({ error: 'No active sessions found for the psychologist.' });
        }

        res.status(200).json(sessions);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the psychologist sessions.' });
    }
});

// Ruta para obtener todos los usuarios con formato
router.get('/psycho/clients/:id', async (req, res) => {
    try {
        const sessions = await Session.find({ psycho_id: req.params.id, active: true });
        const clientIds = sessions.map(session => session.client_id);
        const clients = await User.find({ _id: { $in: clientIds }, role: 'CLIENT' });

        const formattedClients = clients.map(client => ({
            id: client._id,
            name: client.name,
            email: client.email,
            role: client.role,
        }));
        res.send(formattedClients);
    } catch (err) {
        res.status(500).send(err);
    }
});


export default router;
