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

  it("Only Admins have access", async () => {
    const resToken = await request(app).post("/api/user/login").send({ username: "Gast", pin: "1234" });
    expect(resToken.status).toBe(200);
    expect(resToken.body).toHaveProperty("token");

    const res = await request(app).get("/api/admin/machines").set("Authorization", `Bearer ${resToken.body.token}`);

    expect(res.body).toEqual({ message: "Unauthorized: Only for Admins" });
    expect(res.status).toBe(401);
  });

  it("Getting all machines /api/admin/machines", async () => {
    const res = await request(app).get("/api/admin/machines").set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(6);
    res.body.forEach((machine: MachineDTO) => {
      expect(machine).toHaveProperty("id");
      expect(machine).toHaveProperty("name");
      expect(machine).toHaveProperty("isActive");
    });
  });
});
