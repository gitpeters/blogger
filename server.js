const database = require("./database/database.connection");
const app = require("./app");
const AppException = require("./exceptions/exception.app");

database
  .query("SELECT 1")
  .then(() => {
    const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () => {
      console.log(`Application started on port ${port}`);
    });
  })
  .catch((e) => new AppException(e.message, 500));
