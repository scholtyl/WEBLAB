import request from "supertest";
import app from "../src/app";

describe("User Controller Tests", () => {
  it("/api/user/users should return 200 and a list of users", async () => {
    const res = await request(app).get("/api/user/users");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toEqual(2); // laurin und gast

    // Überprüfung der ersten User-Struktur
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("lastTraining");

    const user = res.body.find((user: any) => user.name === "Laurin");
    expect(user).toBeDefined();
    expect(user.lastTraining).toBe("2025-01-12T23:00:00.000Z");
  });

  it("Login with /api/user/login", async () => {
    const res = await request(app).post("/api/user/login").send({ username: "Laurin", pin: "5600" });

    expect(res.body).toHaveProperty("token");
    expect(res.status).toBe(200);
  });

  it("should return 401 for invalid credentials", async () => {
    const res = await request(app).post("/api/user/login").send({ username: "Laurin", pin: "wrongpassword" });

    expect(res.body).toEqual({ error: "Invalid credentials" });
    expect(res.status).toBe(401);
  });

  it("should return 400 if username or pin is missing", async () => {
    const res = await request(app).post("/api/user/login").send({ username: "testuser" });

    expect(res.body).toEqual({ error: "Username and PIN are required" });
    expect(res.status).toBe(400);
  });
});
