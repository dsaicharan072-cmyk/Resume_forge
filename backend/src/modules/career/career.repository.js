const { JobMatchModel, SkillGapModel } = require('./career.model');

class CareerRepository {
  constructor() {
    this.jobMatches = new Map();
    this.skillGaps = new Map();
  }

  async saveJobMatch(userId, candidateData, matches) {
    const record = JobMatchModel.createRecord(userId, candidateData, matches);
    this.jobMatches.set(record.id, record);
    return record;
  }

  async saveSkillGap(userId, targetRole, analysis) {
    const record = SkillGapModel.createRecord(userId, targetRole, analysis);
    this.skillGaps.set(record.id, record);
    return record;
  }
}

module.exports = new CareerRepository();
