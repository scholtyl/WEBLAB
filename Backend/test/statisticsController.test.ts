import request from "supertest";
import app from "../src/app";

describe("Statistics Controller Tests", () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/user/login").send({ username: "Laurin", pin: "5600" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");

    token = res.body.token;
  });

  it("Get Statistics /api/statistics", async () => {
    const res = await request(app).get("/api/statistics").set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(5 * 6); // last 6 Monts for 5 machines

    expect(res.body[1]).toHaveProperty("machineId");
    expect(res.body[1]).toHaveProperty("machine_name");
    expect(res.body[1]).toHaveProperty("training_month");
    expect(res.body[1]).toHaveProperty("avg_weight");
    
    expect(res.body[1].avg_weight).toBe(55);
  });
});
