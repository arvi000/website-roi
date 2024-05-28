// getDetailPouchDb.js
import PouchDB from "pouchdb";

const getDetailPouchDb = async (dbName, keyName) => {
  try {
    const db = new PouchDB(dbName);
    const document = await db.get(keyName);
    return document;
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

export default getDetailPouchDb;
