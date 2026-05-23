class GetAnalyticsSummaryQueryHandler {
    constructor(analyticsRepository) {
      this.analyticsRepository = analyticsRepository;
    }
  
    async handle() {
      return this.analyticsRepository.getSummary();
    }
  }
  
  module.exports = GetAnalyticsSummaryQueryHandler;