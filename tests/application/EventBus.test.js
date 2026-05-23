const InProcessEventBus = require("../../src/modules/core/infrastructure/events/InProcessEventBus");

const waitForAsyncHandlers = () =>
  new Promise((resolve) => setImmediate(resolve));

describe("EventBus", () => {
  test("should deliver events to subscribers asynchronously", async () => {
    const bus = new InProcessEventBus();

    const received = [];

    bus.subscribe("TestEvent", {
      async handle(event) {
        received.push(event);
      },
    });

    bus.publish({
      eventName: "TestEvent",
      value: 123,
    });

    await waitForAsyncHandlers();

    expect(received.length).toBe(1);
    expect(received[0].value).toBe(123);
  });
});