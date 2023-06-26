import { openDB } from "idb";

const dbPromise = openDB("books", 1, {
  upgrade(db) {
    db.createObjectStore("keyval");
  },
});

export async function get(key) {
  return (await dbPromise).get("keyval", key);
}

export async function set(key, val) {
  return (await dbPromise).put("keyval", val, key);
}

export async function del(key) {
  return (await dbPromise).delete("keyval", key);
}

export async function keys() {
  return (await dbPromise).getAllKeys("keyval");
}

export async function getAll() {
  return (await dbPromise).getAll("keyval");
}
