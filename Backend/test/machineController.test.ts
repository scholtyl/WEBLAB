import request from "supertest";
import app from "../src/app";
import { MachineDTO } from "../src/DTOs/machineDTO";

describe("Machines Controller Tests", () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/user/login").send({ username: "Laurin", pin: "5600" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should return all machines for a user", async () => {
    const res = await request(app).get("/api/machine/machines").set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach((machine: MachineDTO) => {
      expect(machine).toHaveProperty("id");
      expect(machine).toHaveProperty("name");
      expect(machine).toHaveProperty("lastTraining");
      expect(machine).toHaveProperty("lastWeight");
    });
  });

  it("should return a 400 error if machine ID is not provided", async () => {
    const res = await request(app).get("/api/machine").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({error: "Sorry, no endpoint here!"});
  });

  it("should return details for a specific machine", async () => {
    const machineId = "1";

    const res = await request(app).get(`/api/machine/${machineId}`).set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("machine");
    expect(res.body.machine).toHaveProperty("id", machineId);
    expect(res.body.machine).toHaveProperty("name");
    expect(res.body.machine).toHaveProperty("lastTraining");
    expect(res.body.machine).toHaveProperty("lastWeight");
    expect(Array.isArray(res.body.trainings)).toBe(true);
    res.body.trainings.forEach((training: any) => {
      expect(training).toHaveProperty("id");
      expect(training).toHaveProperty("machine_id", machineId);
      expect(training).toHaveProperty("date");
      expect(training).toHaveProperty("reps1");
      expect(training).toHaveProperty("weight1");
    });
  });

  it("should return 404 for a non-existent machine", async () => {
    const res = await request(app).get("/api/machine/99999").set("Authorization", `Bearer ${token}`);
    expect(res.body).toEqual({ message: "Machine not found." });
    expect(res.status).toBe(404);
  });
});
