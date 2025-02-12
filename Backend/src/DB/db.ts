import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import bcrypt from "bcrypt";
import { DbSeeder } from "./dbSeeder";

let db: Database | null = null;

// Function to initialize and return a single DB instance
async function getDB(): Promise<Database> {
    if (!db) {
        db = await open({
            filename: "./database.sqlite",
            driver: sqlite3.Database
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

        // Seed all the needed entities
        DbSeeder.seedUsers();
        DbSeeder.seedMachines();
    }

    return db;
}

export default getDB;
