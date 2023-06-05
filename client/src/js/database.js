import { openDB } from 'idb';
const dbName = "jate";
const noteCollection = "jate"

const initdb = async () =>
  openDB(dbName, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(noteCollection)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(noteCollection, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB(dbName, 1);

  const trans = await jateDB.transaction(dbName, "readwrite");

  const store = trans.objectStore(noteCollection);

  const req = store.put({id: 1, value: content});

  const res = await req;
};

export const getDb = async () => {

  const jateDB = await openDB(dbName, 1);

  const tran = jateDB.transaction(dbName, "readonly");

  const store = tran.objectStore(noteCollection);

  const req = store.get(1);

  const res = await req;

  return res.value;
}


initdb();