const admin = require("firebase-admin");
const express = require("express");

const app = express();
const PORT = 3000;

//Credenziali di firebase
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<project-management-crud>.firebaseio.com" 
});

const db = admin.firestore();

app.use(express.json());

// Test API per scrivere su Firestore
app.post("/add-data", async (req, res) => {
  try {
    const { collection, data } = req.body;
    const docRef = await db.collection(collection).add(data);
    res.json({ message: "Dati salvati", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test API per leggere da Firestore
app.get("/get-data/:collection", async (req, res) => {
  try {
    const { collection } = req.params;
    const snapshot = await db.collection(collection).get();
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
