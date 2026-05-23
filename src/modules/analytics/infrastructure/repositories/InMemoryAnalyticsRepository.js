const AnalyticsRepository = require("../../domain/repositories/AnalyticsRepository");
const AnalyticsSummary = require("../../domain/entities/AnalyticsSummary");

class InMemoryAnalyticsRepository extends AnalyticsRepository {
  constructor() {
    super();
    this.postMetrics = [];
  }

  async savePostMetric(metric) {
    const existingIndex = this.postMetrics.findIndex((item) => item.postId === metric.postId);

    if (existingIndex === -1) {
      this.postMetrics.push(metric);
    } else {
      this.postMetrics[existingIndex] = metric;
    }

    return metric;
  }

  async findPostMetric(postId) {
    return this.postMetrics.find((metric) => metric.postId === postId) || null;
  }

  async getSummary() {
    const totalPosts = this.postMetrics.length;
    const totalLikes = this.postMetrics.reduce((sum, metric) => sum + metric.likesCount, 0);
    const totalComments = this.postMetrics.reduce((sum, metric) => sum + metric.commentsCount, 0);

    return new AnalyticsSummary({
      totalPosts,
      totalLikes,
      totalComments,
    });
  }
}

module.exports = InMemoryAnalyticsRepository;