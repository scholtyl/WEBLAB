import getDB from "../src/DB/db";
import fs from "fs";

const TEST_DB_FILE = "./test_database.sqlite";

afterAll(async () => {
  const db = await getDB();
  await db.close();
  
  // Lösche die Test-Datenbank nach dem Testlauf
  if (fs.existsSync(TEST_DB_FILE)) {
    fs.unlinkSync(TEST_DB_FILE);
  }
});
