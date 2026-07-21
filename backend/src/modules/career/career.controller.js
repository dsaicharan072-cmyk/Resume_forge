class CareerController {
  async getMatch(req, res, next) {
    try {
      // Calls CareerService
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CareerController();
