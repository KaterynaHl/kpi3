const InProcessEventBus = require("../../src/infrastructure/events/InProcessEventBus");

describe("EventBus", () => {
  test("should deliver events to subscribers", async () => {
    const bus = new InProcessEventBus();
    const received = [];

    bus.subscribe(
      "TestEvent",
      {
        async handle(event) {
          received.push(event);
        },
      }
    );

    await bus.publish({
      eventName: "TestEvent",
      value: 123,
    });

    expect(received.length)
      .toBe(1);

    expect(received[0].value)
      .toBe(123);
  });
});