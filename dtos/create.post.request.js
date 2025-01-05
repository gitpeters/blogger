class CreatePostRequest {
  constructor(title, content, authorId) {
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }
}

module.exports = CreatePostRequest;
