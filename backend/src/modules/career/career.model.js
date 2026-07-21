/**
 * Data Schema / Structures for Career Intelligence Module
 * Permitted models ONLY: CareerGoal, JobMatch, LearningPlan, Application, InterviewPreparation, SkillGap
 */

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

class CareerGoalModel {
  static createRecord(userId, targetRole, targetCompanies) {
    return {
      id: `goal_${Date.now()}`,
      userId,
      targetRole,
      targetCompanies,
      createdAt: new Date().toISOString()
    };
  }
}

class LearningPlanModel {}
class ApplicationModel {}
class InterviewPreparationModel {}
class SkillGapModel {}

module.exports = {
  JobMatchModel,
  CareerGoalModel,
  LearningPlanModel,
  ApplicationModel,
  InterviewPreparationModel,
  SkillGapModel
};
