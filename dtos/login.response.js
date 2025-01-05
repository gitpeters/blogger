class LoginResponse {
  constructor(accessToken, refreshToken = undefined) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.loginTime = new Date(Date.now()).toISOString();
  }
}

module.exports = LoginResponse;
