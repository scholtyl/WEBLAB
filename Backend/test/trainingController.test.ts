import request from "supertest";
import app from "../src/app";
import { date } from "zod";

describe("Training Controller Tests", () => {
  let token: string;
  let trainingId: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/user/login").send({ username: "Laurin", pin: "5600" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should create a new training session", async () => {
    const trainingData = {
      trainingId: trainingId,
      machine_id: 1,
      date: new Date().toISOString(),
      reps1: 10,
      weight1: 50,
      reps2: 8,
      weight2: 55,
      reps3: 6,
      weight3: 60,
    };

    const res = await request(app).post("/api/training").set("Authorization", `Bearer ${token}`).send(trainingData);

    expect(res.status).toBe(201);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("date");
    trainingId = res.body[0].id;
  });

  it("should update an existing training session", async () => {
    const updatedTraining = {
      id: trainingId,
      machine_id: 1,
      date: new Date().toISOString(),
      reps1: 10,
      weight1: 50,
      reps2: 8,
      weight2: 55,
      reps3: 6,
      weight3: 60,
    };

    const res = await request(app).put("/api/training").set("Authorization", `Bearer ${token}`).send(updatedTraining);
    
    expect(res.body).toEqual({ message: "Training updated successfully." });
    expect(res.status).toBe(200);
  });

  it("should delete a training session", async () => {
    const res = await request(app).delete(`/api/training/${trainingId}`).set("Authorization", `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual("Success");
  });

  it("should return 403 if trying to delete another user's training", async () => {
    const res = await request(app).delete("/api/training/invalid-id").set("Authorization", `Bearer ${token}`);
    
    expect(res.body).toEqual("No training found with id invalid-id");
    expect(res.status).toBe(404);
  });
});
