const careerService = require('./career.service');

class CareerController {
  async getCompanyMatch(req, res, next) {
    try {
      const payload = req.body || {};
      const userId = req.user?.id || 'anonymous';
      const result = await careerService.calculateCompanyMatches(payload, userId);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getSkillGap(req, res, next) {
    try {
      const payload = req.body || {};
      const userId = req.user?.id || 'anonymous';
      const result = await careerService.calculateSkillGap(payload, userId);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getRoadmap(req, res, next) {
    try {
      const query = req.query || {};
      const userId = req.user?.id || 'anonymous';
      const result = await careerService.getLearningRoadmap(query, userId);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async postInterviewPrep(req, res, next) {
    try {
      const payload = req.body || {};
      const userId = req.user?.id || 'anonymous';
      const result = await careerService.generateInterviewPrep(payload, userId);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobs(req, res, next) {
    try {
      const query = req.query || {};
      const result = await careerService.getLiveJobs(query);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async postApplication(req, res, next) {
    try {
      const payload = req.body || {};
      const userId = req.user?.id || 'anonymous';
      const result = await careerService.saveApplication(payload, userId);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getApplications(req, res, next) {
    try {
      const userId = req.user?.id || 'anonymous';
      const result = await careerService.getApplications(userId);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async postRecruiter(req, res, next) {
    try {
      const payload = req.body || {};
      const userId = req.user?.id || 'anonymous';
      const result = await careerService.evaluateByRecruiter(payload, userId);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CareerController();
