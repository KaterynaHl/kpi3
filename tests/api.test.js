const request = require("supertest");

const app = require("../src/app");
const { resetStore } = require("../src/modules/core/infrastructure/database/store");

beforeEach(() => {
  resetStore();
});

const waitForAsyncHandlers = () =>
  new Promise((resolve) => setImmediate(resolve));

describe("Modular Monolith Microblog API", () => {
  test("core creates post and analytics eventually updates summary", async () => {
    await request(app).post("/auth/register").send({
      username: "katya",
      email: "katya@test.com",
      password: "123456",
    }).expect(201);

    const loginResponse = await request(app).post("/auth/login").send({
      email: "katya@test.com",
      password: "123456",
    }).expect(200);

    const token = loginResponse.body.token;

    const createResponse = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "My first modular monolith post",
      })
      .expect(201);

    expect(createResponse.body.id).toBeDefined();

    await waitForAsyncHandlers();

    const analyticsResponse = await request(app)
      .get("/analytics/summary")
      .expect(200);

    expect(analyticsResponse.body.totalPosts).toBe(1);
  });

  test("query should not require authorization", async () => {
    await request(app).get("/posts").expect(200);
  });

  test("unauthorized user cannot execute create post command", async () => {
    await request(app)
      .post("/posts")
      .send({
        content: "Unauthorized post",
      })
      .expect(401);
  });
});