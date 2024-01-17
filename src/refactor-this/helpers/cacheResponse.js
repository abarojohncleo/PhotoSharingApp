import { openDB } from 'idb';

const DB_NAME = 'api-cache';
const STORE_NAME = 'responses';

const openDatabase = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
};

const getFromCache = async (url) => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME);
  const store = transaction.objectStore(STORE_NAME);
  const cachedData = await store.get(url);
  return cachedData;
};

const saveToCache = async (url, data) => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.put(data, url);
  await transaction.complete;
};

export { getFromCache, saveToCache };