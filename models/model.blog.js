const dateFormatter = require('../utils/date.formatter');

class Blog {
  constructor(id, authorId, title, content, coverImage, imagePublicId) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.coverImage = coverImage;
    this.imagePublicId = imagePublicId;
    this.createdAt = dateFormatter(Date.now());
    this.updatedAt = dateFormatter(Date.now());
  }
}

module.exports = Blog;
