class CreateUserRequest {
  constructor(firstName, lastName, email, phoneNumber, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phoneNumber;
    this.password = password;
  }
}

module.exports = CreateUserRequest;
