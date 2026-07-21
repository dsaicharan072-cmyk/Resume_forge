class JobMatchModel {
  static createRecord(userId, candidateData, matches) {
    return {
      id: `match_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId: userId || 'anonymous',
      candidateData,
      matches,
      createdAt: new Date().toISOString()
    };
  }
}

class SkillGapModel {
  static createRecord(userId, targetRole, analysis) {
    return {
      id: `gap_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId: userId || 'anonymous',
      targetRole,
      analysis,
      createdAt: new Date().toISOString()
    };
  }
}

class LearningPlanModel {
  static createRecord(userId, roadmapData) {
    return {
      id: `plan_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId: userId || 'anonymous',
      roadmapData,
      createdAt: new Date().toISOString()
    };
  }
}

class CareerGoalModel {}
class ApplicationModel {}
class InterviewPreparationModel {}

module.exports = {
  JobMatchModel,
  SkillGapModel,
  LearningPlanModel,
  CareerGoalModel,
  ApplicationModel,
  InterviewPreparationModel
};
