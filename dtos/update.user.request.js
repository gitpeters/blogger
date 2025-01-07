class UpdateUserRequest {
  constructor(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phoneNumber;
  }
}

module.exports = UpdateUserRequest;
