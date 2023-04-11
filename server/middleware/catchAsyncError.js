module.exports = (funAsAProp) => (req, res, next) => {
  Promise.resolve(funAsAProp(req, res, next)).catch(next);
};
