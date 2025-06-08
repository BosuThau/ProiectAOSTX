// /utils/functions.js

import { connectToDatabase } from '@/lib/mongodb';

export const saveSearch = async (data) => {
  try {
    const { database } = await connectToDatabase();
    const collection = database.collection('Proiect');
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.error('Eroare la salvarea căutării în MongoDB:', error);
    throw new Error('Nu s-a putut salva căutarea');
  }
};

