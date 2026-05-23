class PostCreatedAnalyticsHandler {
    constructor(analyticsRepository, coreEventTranslator) {
      this.analyticsRepository = analyticsRepository;
      this.coreEventTranslator = coreEventTranslator;
    }
  
    async handle(event) {
      const metric = this.coreEventTranslator.toPostMetric(event);
  
      await this.analyticsRepository.savePostMetric(metric);
    }
  }
  
  module.exports = PostCreatedAnalyticsHandler;