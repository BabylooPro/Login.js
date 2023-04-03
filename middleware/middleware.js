// REQUEST HTTP
const logger = (req, res, next) => {
  next();
}

// MANAGE ERROR
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('AN ERROR HAS OCCURRED');
}

module.exports = {
  logger,
  errorHandler,
}
