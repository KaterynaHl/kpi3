const request = require("supertest");
const app = require("../src/app");
const { resetStore } = require("../src/infrastructure/database/store");

beforeEach(() => {
  resetStore();
});

describe("CQS Microblog API", () => {
  test("command creates post and query returns read model", async () => {
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
        content: "My first CQS post",
      })
      .expect(201);

    expect(createResponse.body.id).toBeDefined();

    const postsResponse = await request(app)
      .get("/posts")
      .expect(200);

    expect(postsResponse.body.length).toBe(1);
    expect(postsResponse.body[0]).toHaveProperty("id");
    expect(postsResponse.body[0]).toHaveProperty("content");
    expect(postsResponse.body[0]).toHaveProperty("likesCount");
    expect(postsResponse.body[0]).toHaveProperty("comments");
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