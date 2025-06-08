//pages/api/searches.js
import { connectToDatabase } from '../../lib/mongodb'; // Importă funcția de conectare la MongoDB

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const searchData = req.body;
      console.log("Datele primite pentru salvare:", searchData); // Log pentru a verifica datele primite

      // Adăugăm un timestamp la date pentru a le putea sorta mai ușor
      searchData.timestamp = new Date().toISOString();

      const { database } = await connectToDatabase();
      const collection = database.collection('Proiect');

      // Inserăm datele în baza de date
      const result = await collection.insertOne(searchData);

      console.log("Date salvate cu succes în MongoDB:", result); // Log pentru a verifica rezultatul salvării
      res.status(200).json({ message: 'Căutarea a fost salvată cu succes!', data: result });
    } catch (error) {
      console.error('Eroare la salvarea căutării în MongoDB:', error);
      res.status(500).json({ error: 'Nu s-a putut salva căutarea' });
    }
  } else if (req.method === 'GET') {
    try {
      const { database } = await connectToDatabase();
      const collection = database.collection('Proiect');
      
      // Preluăm toate documentele din colecție, sortate după timestamp (descrescător)
      const searches = await collection.find({}).sort({ timestamp: -1 }).toArray();
      console.log("Istoricul căutărilor:", searches); // Verificăm datele returnate de GET
      
      // Dacă datele sunt corecte, le trimitem în răspuns
      res.status(200).json({ data: searches });
    } catch (error) {
      console.error('Eroare la preluarea istoricului:', error);
      res.status(500).json({ error: 'Nu s-a putut prelua istoricul' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ error: 'Metodă nepermisă' });
  }
}

export default handler;
