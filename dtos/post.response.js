class PostResponse {
  constructor(id, title, content, coverImage, imagePublicId, author, category) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.coverImage = coverImage;
    this.imagePublicId = imagePublicId;
    this.author = author;
    this.category = category;
  }
}

module.exports = PostResponse;
