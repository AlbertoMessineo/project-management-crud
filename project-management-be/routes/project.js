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

module.exports = router;
