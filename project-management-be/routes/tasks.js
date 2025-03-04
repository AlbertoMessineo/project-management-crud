const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

// Api per ottenere i task di un progetto
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const snapshot = await db.collection('tasks').where('projectId', '==', projectId).get();
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Creare un task
router.post('/', async (req, res) => {
  try {
    const { projectId, title, completed } = req.body;
    const docRef = await db.collection('tasks').add({ projectId, title, completed });
    res.json({ id: docRef.id, projectId, title, completed });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Aggiornare un task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    await db.collection('tasks').doc(id).update({ title, completed });
    res.json({ id, title, completed });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Eliminare un task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('tasks').doc(id).delete();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
