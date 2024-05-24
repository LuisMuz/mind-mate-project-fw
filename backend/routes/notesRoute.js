import express from 'express';
import { DailyNote } from '../models.js';

const router = express.Router();

// Ruta para crear una nota diaria
router.post('/', async (req, res) => {
  try {
      const note = new DailyNote(req.body);
      await note.save();
      res.status(201).send(note);
  } catch (err) {
      res.status(400).send(err);
  }
});

// Ruta para obtener todas las notas de un usuario
router.get('/:id', async (req, res) => {
  try {
      const notes = await DailyNote.find({ client_id: req.params.id });
      res.send(notes);
  } catch (err) {
      res.status(500).send(err);
  }
});

export default router;
