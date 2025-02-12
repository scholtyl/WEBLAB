import getDB from "./db";
import bcrypt from "bcrypt";

export class DbSeeder {
  static async seedUsers() {
    const db = await getDB();

    const users = [
      {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        name: "Laurin",
        last_training: "2001-03-19",
        is_admin: 1,
        password: "5600",
      },
      {
        id: "b92d7b74-8c3b-4e3f-a1b4-8b2e9eb4d9f3",
        name: "Gast",
        last_training: "1291-08-01",
        is_admin: 0,
        password: "1234",
      },
    ];

    for (const user of users) {
      const existingUser = await db.get("SELECT id FROM users WHERE id = ?", [user.id]);
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await db.run("INSERT INTO users (id, name, last_training, is_admin, password) VALUES (?, ?, ?, ?, ?)", [
          user.id,
          user.name,
          user.last_training,
          user.is_admin,
          hashedPassword,
        ]);
        console.log(`User ${user.name} created.`);
      }
    }
  }

  static async seedMachines() {
    const db = await getDB();

        const machines = [
      { id: "1", name: "Bauchpresse", isActive: 1 },
      { id: "2", name: "Beinpresse", isActive: 1 },
      { id: "3", name: "Brustpresse", isActive: 1 },
      { id: "4", name: "Lat-Zug", isActive: 0 },
      { id: "5", name: "Rückenstrecker", isActive: 1 },
      { id: "6", name: "Schulterpresse", isActive: 1 },
    ];

    for (const machine of machines) {
      const existingMachine = await db.get("SELECT id FROM machines WHERE id = ?", [machine.id]);
      if (!existingMachine) {
        await db.run("INSERT INTO machines (id, name, is_active) VALUES (?, ?, ?)", [
          machine.id,
          machine.name,
          machine.isActive,
        ]);
        console.log(`Machine ${machine.name} added.`);
      }
    }
  }
}
