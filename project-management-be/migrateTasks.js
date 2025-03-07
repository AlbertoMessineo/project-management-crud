const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
                      credential: admin.credential.cert(serviceAccount)
                    });

const db = admin.firestore();

async function migrateTasks() {
  try {
    const projectsSnapshot = await db.collection('projects').get();
    const updatePromises = [];

    projectsSnapshot.forEach(doc => {
      const data = doc.data();


      if (Array.isArray(data.tasks)) {

        if (data.tasks.length > 0 && typeof data.tasks[0] === 'string') {
          const newTasks = data.tasks.map((task, index) => {
            return {
              id: `${doc.id}-${index}-${Date.now()}`,
              title: task,
              completed: false
            };
          });

          console.log(`Aggiornamento documento ${doc.id} con tasks:`, newTasks);
          const promise = db.collection('projects').doc(doc.id).update({
                                                                         tasks: newTasks
                                                                       });
          updatePromises.push(promise);
        } else {
          console.log(`Documento ${doc.id}: tasks già migrati o array vuoto.`);
        }
      } else {
        console.log(`Documento ${doc.id} non contiene un campo tasks valido.`);
      }
    });

    await Promise.all(updatePromises);
    console.log('Migrazione completata con successo!');
  } catch (error) {
    console.error('Errore durante la migrazione:', error);
  }
}

migrateTasks().then(() => process.exit(0)).catch(() => process.exit(1));
