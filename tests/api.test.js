const request = require("supertest");
const app = require("../src/app");
const { resetStore } = require("../src/infrastructure/database/store");

beforeEach(() => {
  resetStore();
});

describe("Microblog API layered architecture", () => {
  test("register, login and create post", async () => {
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

    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "My first layered post",
      })
      .expect(201);
  });

  test("unauthorized user cannot create post", async () => {
    await request(app)
      .post("/posts")
      .send({
        content: "Unauthorized post",
      })
      .expect(401);
  });
});