class CommentAddedAnalyticsHandler {
    constructor(analyticsRepository) {
      this.analyticsRepository = analyticsRepository;
    }
  
    async handle(event) {
      const metric = await this.analyticsRepository.findPostMetric(event.postId);
  
      if (!metric) {
        return;
      }
  
      metric.recordComment();
  
      await this.analyticsRepository.savePostMetric(metric);
    }
  }
  
  module.exports = CommentAddedAnalyticsHandler;