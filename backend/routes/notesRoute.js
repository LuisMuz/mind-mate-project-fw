import express from 'express';
import { DailyNote, Session } from '../models.js';

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

// Ruta para obtener todas las notas de clientes 
// de las sesiones activas de un psicologo
router.get('/psycho/:id', async (req, res) => {
  try {
    const sessions = await Session.find({ psycho_id: req.params.id });
    const clients = sessions.map(session => session.client_id);
    const notes = await DailyNote.find({ client_id: { $in: clients } });
    res.send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const note = await DailyNote.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Ruta para obtener la actividad de las notas
router.get('/', async (req, res) => {
  try {
    const activities = await DailyNote.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $limit: 4
      }
    ]);
    res.send(activities.reverse());
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
