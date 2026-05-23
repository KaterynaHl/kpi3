class PostLikedAnalyticsHandler {
    constructor(analyticsRepository) {
      this.analyticsRepository = analyticsRepository;
    }
  
    async handle(event) {
      const metric = await this.analyticsRepository.findPostMetric(event.postId);
  
      if (!metric) {
        return;
      }
  
      metric.recordLike();
  
      await this.analyticsRepository.savePostMetric(metric);
    }
  }
  
  module.exports = PostLikedAnalyticsHandler;