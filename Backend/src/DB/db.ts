import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import bcrypt from "bcrypt";

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

        // Insert default user if they don't exist
        const defaultUserId = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
        const existingUser = await db.get("SELECT id FROM users WHERE id = ?", [defaultUserId]);
        const hashedPassword = await bcrypt.hash("5600", 10);

        if (!existingUser) {
            await db.run(
                "INSERT INTO users (id, name, last_training, is_admin, password) VALUES (?, ?, ?, ?, ?)",
                [defaultUserId, "Laurin", "2001-03-19", 1, hashedPassword]
            );
            console.log("Default user Laurin created.");
        }
    }

    return db;
}

export default getDB;
