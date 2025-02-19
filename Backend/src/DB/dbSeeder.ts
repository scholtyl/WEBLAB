import getDB from "./db";
import bcrypt from "bcrypt";

export class DbSeeder {
  static async seedUsers() {
    const db = await getDB();

    const users = [
      {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        name: "Laurin",
        is_admin: 1,
        password: "5600",
      },
      {
        id: "b92d7b74-8c3b-4e3f-a1b4-8b2e9eb4d9f3",
        name: "Gast",
        is_admin: 0,
        password: "1234",
      },
    ];

    for (const user of users) {
      const existingUser = await db.get("SELECT id FROM users WHERE id = ?", [user.id]);
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await db.run("INSERT INTO users (id, name, is_admin, password) VALUES (?, ?, ?, ?)", [
          user.id,
          user.name,
          user.is_admin,
          hashedPassword,
        ]);
        console.log(`[Info] User ${user.name} created.`);
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
        console.log(`[info] Machine ${machine.name} added.`);
      }
    }
  }

  static async seedTrainings() {
    const db = await getDB();
    
    const trainingId = "1";
    const userId = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
    const machineId = "1";
    const trainingDate = new Date(2025,0,13).toISOString(); // 13.01.2025

    const existingTraining = await db.get("SELECT id FROM trainings WHERE id = ?", [trainingId]);
    if (!existingTraining) {
      await db.run(
        `INSERT INTO trainings (id, user_id, machine_id, date, 
          reps1, weight1, reps2, weight2, reps3, weight3)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [trainingId, userId, machineId, trainingDate, 10, 50, 8, 55, 6, 60]
      );
      console.log("[Info] Default training for user Laurin on machine 1 added.");
    }
  }
}
