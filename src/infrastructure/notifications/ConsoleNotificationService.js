const NotificationService = require(
    "../../domain/notifications/NotificationService"
  );
  
  class ConsoleNotificationService extends NotificationService {
    async send(notification) {
      console.log(
        `[NOTIFICATION]: ${notification.message}`
      );
    }
  }
  
  module.exports = ConsoleNotificationService;