import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// db.json file path
export const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '..', 'db.json');

// Configure lowdb to write data to JSON file
const adapter = new JSONFile(file);
const defaultData = { categories: [] };
const db = new Low(adapter, defaultData);

// CRUD operations for a collection of items
export const getCollection = async (collection) => {
  await db.read();
  return db.data[collection];
};

export const addItemToCollection = async (item, collection) => {
  const id = uuidv4();
  const newItem = { ...item, id };
  db.data[collection].push(newItem);
  await db.write();
  return newItem;
};

export const updateItemInCollection = async (itemToUpdate, collection) => {
  db.data[collection] = db.data[collection].map((item) => (item.id === itemToUpdate.id ? itemToUpdate : item));
  await db.write();
  return itemToUpdate;
};

export const deleteItemFromCollection = async (id, collection) => {
  db.data[collection] = db.data[collection].filter((item) => item.id !== id);
  await db.write();
};

export const getItemFromCollection = async (id, collection) => {
  await db.read();
  return db.data[collection].find((item) => item.id === id);
};
