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

class InterviewPreparationModel {
  static createRecord(userId, targetRole, prepData) {
    return {
      id: `prep_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId: userId || 'anonymous',
      targetRole,
      prepData,
      createdAt: new Date().toISOString()
    };
  }
}

class ApplicationModel {
  static createRecord(userId, appData) {
    return {
      id: appData.id || `app_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId: userId || 'anonymous',
      company: appData.company || 'Unknown Company',
      role: appData.role || 'Software Engineer',
      status: appData.status || 'Saved', // Saved, Applied, OA, Interview, Offer, Rejected
      location: appData.location || 'Remote',
      appliedDate: appData.appliedDate || new Date().toISOString().split('T')[0],
      notes: appData.notes || '',
      updatedAt: new Date().toISOString()
    };
  }
}

class CareerGoalModel {}

module.exports = {
  JobMatchModel,
  SkillGapModel,
  LearningPlanModel,
  InterviewPreparationModel,
  ApplicationModel,
  CareerGoalModel
};
