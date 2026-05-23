const EventBus = require("../../../../shared/event-bus/EventBus");

class InProcessEventBus extends EventBus {
  constructor() {
    super();
    this.handlers = {};
  }

  subscribe(eventName, handler) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }

    this.handlers[eventName].push(handler);
  }

  publish(event) {
    const eventHandlers = this.handlers[event.eventName] || [];

    for (const handler of eventHandlers) {
      setImmediate(async () => {
        try {
          await handler.handle(event);
        } catch (error) {
          console.error(`[EVENT_HANDLER_ERROR] ${event.eventName}: ${error.message}`);
        }
      });
    }
  }
}

module.exports = InProcessEventBus;