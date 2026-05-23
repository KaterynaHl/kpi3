const EventBus = require("../../shared/event-bus/EventBus");
  
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
  
    async publish(event) {
      const eventHandlers =
        this.handlers[event.eventName] || [];
  
      for (const handler of eventHandlers) {
        await handler.handle(event);
      }
    }
  }
  
  module.exports = InProcessEventBus;