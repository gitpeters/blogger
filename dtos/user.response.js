class UserResponse {
  constructor(
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    username,
    metadata = {}
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phoneNumber;
    this.role = role;
    this.username = username;
    this.metadata = metadata;
  }
}

module.exports = UserResponse;
