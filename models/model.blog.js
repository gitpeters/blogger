const dateFormatter = require('../utils/date.formatter');

class Blog {
  constructor(id, title, content, coverImage, authorId) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.coverImage = coverImage;
    this.authorId = authorId;
    this.createdAt = dateFormatter(Date.now);
    this.updatedAt = dateFormatter(Date.now);
  }
}

module.exports = Blog;
