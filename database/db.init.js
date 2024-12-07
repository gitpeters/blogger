const database = require('./database.connection');

// create tables

const createUserTable = async () => {
  try {
    await database.query(`
        CREATE TABLE IF NOT EXISTS blogger.users (
      id INT NOT NULL AUTO_INCREMENT,
      first_name VARCHAR(45) NULL,
      last_name VARCHAR(45) NULL,
      email VARCHAR(45) NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY UK_EMAIL_ADDRESS (email)
      )
      ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
        `);
    console.log('User table successfully created');
  } catch (error) {
    console.error('Error occurred while creating user table: ', error.message);
  }
};

const createBlogTable = async () => {
  try {
    await database.query(`
        CREATE TABLE IF NOT EXISTS blogger.blogs (
      id INT NOT NULL AUTO_INCREMENT,
      author_id INT NOT NULL,
      content MEDIUMTEXT NULL,
      cover_image VARCHAR(200) NULL,
      title VARCHAR(45) NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      image_public_id VARCHAR(100),
      PRIMARY KEY (id),
      KEY FK_BLOG_AUTHOR (author_id),
      CONSTRAINT FK_BLOG_AUTHOR FOREIGN KEY (author_id) REFERENCES users(id))
      ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
        `);
    console.log('Blog table successfully created');
  } catch (error) {
    console.error('Error occurred while creating blog table: ', error.message);
  }
};

const updateBlogTable = async () => {
  try {
    await database.query(
      `
      ALTER TABLE blogger.blogs
      MODIFY COLUMN cover_image VARCHAR(255);
      `
    );
    console.log('Blog table successfully updated');
  } catch (error) {
    console.error('Error occurred while updating blog table: ', error.message);
  }
};

if (process.argv[2] === '--create-tbls') {
  createUserTable();
  createBlogTable();
}

if (process.argv[2] === '--update-tbls') {
  updateBlogTable();
}

// run the following code on the terminal to trigger database table creation:
//NOTE node database/db.init --create-tbls
//NOTE node database/db.init --update-tbls
