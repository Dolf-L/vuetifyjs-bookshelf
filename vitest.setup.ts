import 'fake-indexeddb/auto'
import { openDB } from 'idb'

globalThis.openDB = openDB;
globalThis.CSS = { supports: () => false };