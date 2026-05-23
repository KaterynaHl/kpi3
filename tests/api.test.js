const request = require("supertest");
const app = require("../src/app");

describe("GET /posts", () => {
  test("should return posts", async () => {
    const response = await request(app).get("/posts");

    expect(response.statusCode).toBe(200);
  });
});