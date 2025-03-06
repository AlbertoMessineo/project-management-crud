const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { db } = require('./firebase'); // Importazione Firebase dal modulo esterno
const projectRoutes = require('./routes/project');
const tasksRoutes = require('./routes/tasks');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/projects', projectRoutes);
app.use('/tasks', tasksRoutes);

// Test API
app.get('/', (req, res) => {
  res.send('Project Management API is running!');
});

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
