const Email = require("../../src/modules/core/domain/value-objects/Email");
const PostContent = require("../../src/modules/core/domain/value-objects/PostContent");

describe("Value Objects", () => {
  test("should create valid email", () => {
    const email = new Email("TEST@MAIL.COM");

    expect(email.value).toBe("test@mail.com");
  });

  test("should reject invalid email", () => {
    expect(() => new Email("wrong")).toThrow();
  });

  test("should reject empty post content", () => {
    expect(() => new PostContent("")).toThrow();
  });
});