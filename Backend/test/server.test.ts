import request from "supertest";
import app from "../src/app";

describe("API Endpoints", () => {
    it("GET /api/user should return 200", async () => {
        const res = await request(app).get("/api/user/users");
        expect(res.status).toBe(200);
    });

    it("GET /api/machine should return 401 if not authenticated", async () => {
        const res = await request(app).get("/api/machine");
        expect(res.status).toBe(401);
    });

    it("GET /random-url should return 404", async () => {
        const res = await request(app).get("/random-url");
        expect(res.status).toBe(404);
        expect(res.text).toBe("Sorry, no endpoint here!");
    });
});
