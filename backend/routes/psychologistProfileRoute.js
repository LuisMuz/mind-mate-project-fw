import express from 'express';
import { PsychologistProfile } from '../models.js';

const router = express.Router();

// Ruta para crear un perfil de psicólogo
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    console.log(req);
    const profile = new PsychologistProfile(req.body);
    await profile.save();
    res.status(201).send(profile);
  } catch (err) {
    res.status(400).send(err);    
  }
});

// Ruta para obtener el perfil de un psicólogo por ID de usuario
router.get('/:id', async (req, res) => {
  try {
      const profile = await PsychologistProfile.findOne({ psychologist_id: req.params.id });
      if (!profile) {
          return res.status(404).send();
      }
      res.send(profile);
  } catch (err) {
      res.status(500).send(err);
  }
});

// Ruta para crear o actualizar el perfil de un psicólogo por ID de usuario
router.post('/:id', async (req, res) => {
  try {
      const profile = await PsychologistProfile.findOneAndUpdate(
          { psychologist_id: req.params.id },
          req.body,
          { new: true, upsert: true, runValidators: true }
      );
      res.status(201).send(profile);
  } catch (err) {
      res.status(400).send(err);
  }
});

// Ruta para actualizar el perfil de un psicólogo por ID de usuario
router.patch('/:id', async (req, res) => {
  try {
      const profile = await PsychologistProfile.findOneAndUpdate(
          { psychologist_id: req.params.id },
          req.body,
          { new: true, runValidators: true }
      );
      if (!profile) {
          return res.status(404).send();
      }
      res.send(profile);
  } catch (err) {
      res.status(400).send(err);
  }
});

// Ruta para eliminar el perfil de un psicólogo por ID de usuario (opcional)
router.delete('/:id', async (req, res) => {
  try {
      const profile = await PsychologistProfile.findOneAndDelete({ psychologist_id: req.params.id });
      if (!profile) {
          return res.status(404).send();
      }
      res.send(profile);
  } catch (err) {
      res.status(500).send(err);
  }
});

export default router;