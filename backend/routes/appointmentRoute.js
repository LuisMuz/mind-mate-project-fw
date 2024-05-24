import express from 'express';
import { Appointment } from '../models.js';

const router = express.Router();

// Ruta para crear una cita
router.post('/', async (req, res) => {
  try {
      const appointment = new Appointment(req.body);
      await appointment.save();
      res.status(201).send(appointment);
  } catch (err) {
      res.status(400).send(err);
  }
});

// Ruta para obtener todas las citas de un cliente
router.get('/client/:id', async (req, res) => {
  try {
      const appointments = await Appointment.find({ client_id: req.params.id });
      res.send(appointments);
  } catch (err) {
      res.status(500).send(err);
  }
});

// Ruta para obtener todas las citas de un psicólogo
router.get('/psychologist/:id', async (req, res) => {
  try {
      const appointments = await Appointment.find({ psycho_id: req.params.id });
      res.send(appointments);
  } catch (err) {
      res.status(500).send(err);
  }
});

export default router;