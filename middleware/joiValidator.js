const joiErrors = () => (err, req, res, next) => {
  console.log('=========', err);
  if (!err.isJoi) return next(err);
  return res.status(400).json({
    message: err.details[0].message
  });
};

export default joiErrors;
