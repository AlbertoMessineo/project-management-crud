const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
//  Ottenere le task di un progetto
router.get('/:projectId/tasks', async (req, res) => {
  try {
    const {projectId} = req.params;
    const projectRef = db.collection('projects')
                         .doc(projectId);
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      return res.status(404)
                .json({message: 'Progetto non trovato'});
    }
    const projectData = projectDoc.data();
    res.json(projectData.tasks || []);
  }
  catch (error) {
    res.status(500)
       .send(error.message);
  }
});
// Creare una nuova task
router.post('/:projectId/tasks', async (req, res) => {
  try {
    const {projectId} = req.params;
    const {
            title,
            completed
          } = req.body;
    const projectRef = db.collection('projects')
                         .doc(projectId);
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      return res.status(404)
                .json({message: 'Progetto non trovato'});
    }
    const projectData = projectDoc.data();
    const newTaskId = `${projectId}-${projectData.tasks?.length || 0}-${Date.now()}`;

    const newTask = {
      id: newTaskId,
      title,
      completed
    };
    // Aggiunge la nuova task all'array
    await projectRef.update({
                              tasks: [...(projectData.tasks || []), newTask]
                            });
    res.json(newTask);
  }
  catch (error) {
    res.status(500)
       .send(error.message);
  }
});
//  Aggiornare una task
router.put('/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const {
            projectId,
            taskId
          } = req.params;
    const {
            title,
            completed
          } = req.body;
    const projectRef = db.collection('projects')
                         .doc(projectId);
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      return res.status(404)
                .json({message: 'Progetto non trovato'});
    }
    let projectData = projectDoc.data();
    let tasks = projectData.tasks || [];
    let taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404)
                .json({message: 'Task non trovata'});
    }
    tasks[taskIndex] =
      {
        ...tasks[taskIndex],
        title,
        completed
      };
    await projectRef.update({tasks});
    res.json(tasks[taskIndex]);
  }
  catch (error) {
    res.status(500)
       .send(error.message);
  }
});
// Eliminare una task
router.delete('/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const {
            projectId,
            taskId
          } = req.params;
    const projectRef = db.collection('projects')
                         .doc(projectId);
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      return res.status(404)
                .json({message: 'Progetto non trovato'});
    }
    let projectData = projectDoc.data();
    let tasks = projectData.tasks || [];
    let filteredTasks = tasks.filter(task => task.id !== taskId);
    if (tasks.length === filteredTasks.length) {
      return res.status(404)
                .json({message: 'Task non trovata'});
    }
    await projectRef.update({tasks: filteredTasks});
    res.json({message: 'Task eliminata'});
  }
  catch (error) {
    res.status(500)
       .send(error.message);
  }
});
module.exports = router;
