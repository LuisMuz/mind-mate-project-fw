import express from 'express';
import { Session, SessionToken } from '../models.js';

const router = express.Router();

// Ruta para generar un nuevo token de sesión
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const { psycho_id, token } = req.body;

    const existingToken = await SessionToken.findOne({ token, used:false });

    if (existingToken) {
      console.log("token exist");
      return res.status(400).json({ error: 'This token already exist.' });
    }

    const sessionToken = new SessionToken({
      psycho_id,
      token
    });

    await sessionToken.save();

    res.status(201).json(sessionToken);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating a session token.' });
  }
});

// Ruta para validar un token de sesión y crear una nueva sesión
router.post('/validate', async (req, res) => {
  //console.log(req.body);
  try {
    const { userId, token } = req.body;
    const sessionToken = await SessionToken.findOne({ token });

    if (!sessionToken || sessionToken.used) {
      return res.status(400).json({ error: 'Invalid or expired session token.' });
    }
    sessionToken.used = true;
    await sessionToken.save();

    const session = new Session({
      psycho_id: sessionToken.psycho_id,
      client_id: userId,
      time: new Date(),
      active: true
    });

    await session.save();

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while validating the session token.' });
  }
});

// Nueva ruta para obtener todos los tokens de un psicólogo
router.get('/:psycho_id', async (req, res) => {
  try {
    const { psycho_id } = req.params;
    const tokens = await SessionToken.find({ psycho_id, used:false });

    if (!tokens) {
      return res.status(404).json({ error: 'No tokens found for this psychologist.' });
    }

    res.status(200).json(tokens);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching tokens.' });
  }
});

export default router;
