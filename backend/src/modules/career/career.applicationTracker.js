class ApplicationTracker {
  /**
   * Calculate aggregated career application metrics
   * 
   * @param {Array} applications 
   * @returns {Object} { totalApplications, totalInterviews, totalOffers, successRate }
   */
  calculateAnalytics(applications = []) {
    const totalApplications = applications.length;

    let totalInterviews = 0;
    let totalOffers = 0;

    for (const app of applications) {
      const status = String(app.status).toLowerCase();

      if (['oa', 'interview', 'offer'].includes(status)) {
        totalInterviews++;
      }
      if (status === 'offer') {
        totalOffers++;
      }
    }

    const successRate = totalApplications > 0
      ? Number(((totalOffers / totalApplications) * 100).toFixed(1))
      : 0;

    return {
      totalApplications,
      totalInterviews,
      totalOffers,
      successRate: `${successRate}%`
    };
  }
}

module.exports = new ApplicationTracker();
