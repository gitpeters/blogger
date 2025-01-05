const AuthService = require('../services/service.auth');

class AuthController {
  constructor() {}

  async login(req, res, next) {
    const response = await AuthService.login(
      req.body.username,
      req.body.password
    );
    res.status(200).json({
      status: 'success',
      data: {
        response,
      },
    });
  }
}

module.exports = new AuthController();
