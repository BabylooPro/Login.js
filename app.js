const express = require('express');
const { logger, errorHandler } = require('./middleware/middleware');
const port = 3000;
const app = express();

// MIDDLEWARE
app.use(logger);
app.use(errorHandler);

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`SERVER LISTEN ON PORT ${port}...`);
});
