class AnalyticsModule {
    constructor({ getAnalyticsSummaryQueryHandler }) {
      this.getAnalyticsSummaryQueryHandler = getAnalyticsSummaryQueryHandler;
    }
  
    async getSummary() {
      return this.getAnalyticsSummaryQueryHandler.handle();
    }
  }
  
  module.exports = AnalyticsModule;