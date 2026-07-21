const { JobMatchModel } = require('./career.model');

class CareerRepository {
  constructor() {
    this.jobMatches = new Map();
  }

  async saveJobMatch(userId, candidateData, matches) {
    const record = JobMatchModel.createRecord(userId, candidateData, matches);
    this.jobMatches.set(record.id, record);
    return record;
  }

  async getLatestJobMatch(userId) {
    const userMatches = Array.from(this.jobMatches.values())
      .filter(m => m.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return userMatches[0] || null;
  }
}

module.exports = new CareerRepository();
