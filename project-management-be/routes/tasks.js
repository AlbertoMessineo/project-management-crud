const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

// API per ottenere i task di un progetto
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    // Recupera il documento del progetto
    const projectRef = db.collection('projects').doc(projectId);
    const projectDoc = await projectRef.get();

    // Se il progetto non esiste
    if (!projectDoc.exists) {
      return res.status(404).json({ error: 'Progetto non trovato' });
    }

    // Ottieni le tasks dal progetto
    const projectData = projectDoc.data();
    const tasks = projectData.tasks || []; // Se non ci sono task, restituisce un array vuoto

    res.json(tasks);
  } catch (error) {
    console.error('Errore nel recupero delle tasks:', error);
    res.status(500).send(error.message);
  }
});

router.post('/:projectId/tasks', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title } = req.body; // Per esempio, invii solo il titolo
    const newTask = {
      id: `${Date.now()}`,  // Genera un ID unico (puoi usare anche un UUID)
      title,
      completed: false
    };

    // Recupera il progetto
    const projectRef = db.collection('projects').doc(projectId);
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      return res.status(404).json({ message: 'Progetto non trovato' });
    }
    const projectData = projectDoc.data();
    const tasks = projectData.tasks || [];
    tasks.push(newTask);

    // Aggiorna il documento del progetto
    await projectRef.update({ tasks });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const { title, completed } = req.body;

    // Recupera il progetto
    const projectRef = db.collection('projects').doc(projectId);
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      return res.status(404).json({ message: 'Progetto non trovato' });
    }
    const projectData = projectDoc.data();
    let tasks = projectData.tasks || [];


    tasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, title, completed };
      }
      return task;
    });

    // Aggiorna il documento
    await projectRef.update({ tasks });
    res.json({ id: taskId, title, completed });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.delete('/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    // Recupera il progetto
    const projectRef = db.collection('projects').doc(projectId);
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      return res.status(404).json({ message: 'Progetto non trovato' });
    }
    const projectData = projectDoc.data();
    let tasks = projectData.tasks || [];


    tasks = tasks.filter(task => task.id !== taskId);

    await projectRef.update({ tasks });
    res.json({ message: 'Task eliminata con successo' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
