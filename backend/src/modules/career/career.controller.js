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
}

module.exports = new CareerController();
