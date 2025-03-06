const express = require('express');
const router = express.Router();
const { db } = require('../firebase'); 

// Api per ottenere i progetti
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('projects').get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Api per postare i progetti
router.post('/', async (req, res) => {
  try {
    const { title, description, toDo } = req.body;
    const newProject = { title, description, toDo };
    const docRef = await db.collection('projects').add(newProject);
    res.status(201).json({ id: docRef.id, ...newProject });
  } catch (error) {
    res.status(500).json({ message: 'Errore nella creazione del progetto', error });
  }
});

// Api per aggiornare un progetto esistente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, toDo } = req.body;

    const projectRef = db.collection('projects').doc(id);
    const doc = await projectRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Progetto non trovato' });
    }

    await projectRef.update({ title, description, toDo });
    res.json({ id, title, description, toDo });
  } catch (error) {
    res.status(500).json({ message: 'Errore nell\'aggiornamento del progetto', error });
  }
});

// Api per eliminare un progetto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const projectRef = db.collection('projects').doc(id);
    const doc = await projectRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Progetto non trovato' });
    }

    await projectRef.delete();
    res.json({ message: 'Progetto eliminato con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nell\'eliminazione del progetto', error });
  }
});

module.exports = router;
