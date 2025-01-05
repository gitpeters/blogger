const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppException = require('../exceptions/exception.app');
const { promisify } = require('util');
const LoginResponse = require('../dtos/login.response');
const User = require('../models/model.user');
const { Op } = require('sequelize');

class AuthService {
  constructor() {}

  generateAccessToken(user) {
    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenExpireAt = process.env.ACCESS_TOKEN_EXPIRED_AT;

    return jwt.sign({ id: user.id, role: user.role }, accessSecret, {
      expiresIn: accessTokenExpireAt,
    });
  }

  async confirmPassword(rawPassword, storedPassword) {
    return await bcrypt.compare(rawPassword, storedPassword);
  }

  async login(username, password) {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: username }, { username: username }],
      },
    });

    if (user.isAcountLocked) {
      throw new AppException(
        'Your account is correctly locked due to too many failed login attempt! Please contact system admin.',
        401
      );
    }

    const isPasswordValid = await this.confirmPassword(password, user.password);
    if (!isPasswordValid) {
      const now = new Date();
      const oneMinueAgo = new Date(now.getTime() - 1 * 60 * 1000);
      if (
        user.lastFailedLoginAttempt &&
        user.lastFailedLoginAttempt > oneMinueAgo
      ) {
        user.failedLoginAttempt += 1;
      } else {
        user.failedLoginAttempt = 1;
      }

      user.lastFailedLoginAttempt = now;

      if (user.failedLoginAttempt >= 3) {
        user.isAcountLocked = true;
      }
      user.save();
      throw new AppException(
        'Incorrect login credentials. Please try again!',
        401
      );
    }
    const accessToken = this.generateAccessToken(user);
    return new LoginResponse(accessToken);
  }

  async protect(req, res, next) {
    let accessToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      accessToken = req.cookies.jwt;
    }

    if (!accessToken)
      next(
        new AppException('You are not logged in! Login and try again.', 401)
      );

    const decoded = await promisify(jwt.verify)(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!decoded) {
      return next(new AppException('Invalid access token.', 401));
    }
    const user = await User.findByPk(decoded.id);
    if (!user) return next(new AppException('Not a registered user.', 401));

    req.user = user;
    next();
  }

  restrictTo(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppException('You are not permitted to perform this action', 403)
        );
      }
      next();
    };
  }

  setCookie(res, cookieValue, cookieType) {
    let cookieExpiredAt;
    if (cookieType === 'accessToken') {
      const accessTokenExpireAt = parseInt(
        process.env.ACCESS_TOKEN_EXPIRED_AT.replace('d', ''),
        10
      );
      cookieExpiredAt = new Date(
        Date.now() + accessTokenExpireAt * 24 * 60 * 60 * 1000
      );
    } else if (cookieType === 'refreshToken') {
      const refeshTokenExpireAt = parseInt(
        process.env.REFRESH_TOKEN_EXPIRED_AT.replace('d', ''),
        10
      );
      cookieExpiredAt = new Date(
        Date.now() + refeshTokenExpireAt * 24 * 60 * 60 * 1000
      );
    } else {
      cookieExpiredAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    }
    res.cookie('jwt', cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      expires: cookieExpiredAt,
    });
  }
}

module.exports = new AuthService();
