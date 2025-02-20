import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { DbSeeder } from "./dbSeeder";

let db: Database | null = null;

const isTestEnv = process.env.NODE_ENV === "test";
const DB_FILE = isTestEnv ? "./test_database.sqlite" : "./database.sqlite";

// Function to initialize and return a single DB instance
async function getDB(): Promise<Database> {
  if (!db) {
    db = await open({
      filename: DB_FILE,
      driver: sqlite3.Database,
    });

    // Create tables if they don’t exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            last_training TEXT,
            is_admin INTEGER NOT NULL CHECK (is_admin IN (0, 1)),
            password TEXT NOT NULL
            )
            `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS machines (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            is_active INTEGER NOT NULL CHECK (is_active IN (0, 1))
            )
            `);

    // Create Trainings Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS trainings (
            id TEXT PRIMARY KEY,  
            user_id TEXT NOT NULL,
            machine_id TEXT NOT NULL,
            date TEXT NOT NULL,
            
            reps1 INTEGER NOT NULL,
            weight1 REAL NOT NULL,
            
            reps2 INTEGER NOT NULL,
            weight2 REAL NOT NULL,
            
            reps3 INTEGER NOT NULL,
            weight3 REAL NOT NULL,
            
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (machine_id) REFERENCES machines(id) ON DELETE CASCADE
            )
            `);

    // Seed all the needed entities
    await DbSeeder.seedUsers();
    await DbSeeder.seedMachines();
    await DbSeeder.seedTrainings();
  }

  return db;
}

export default getDB;
