const dateFormatter = require('../utils/date.formatter');

class User {
  constructor(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.createdAt = dateFormatter(Date.now());
    this.updatedAt = dateFormatter(Date.now());
  }
}

module.exports = User;
