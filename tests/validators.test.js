const {
    validateEmail,
  } = require("../src/utils/validators");
  
  test("valid email", () => {
    expect(
      validateEmail("test@gmail.com")
    ).toBe(true);
  });
  
  test("invalid email", () => {
    expect(
      validateEmail("testgmail.com")
    ).toBe(false);
  });