class CreateUserRequest {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

module.exports = CreateUserRequest;
