const isEmpaty = value => value == null
  || typeof value === 'undefined'
  || Object.keys(value).length === 0
  || value.length === 0;

export const checkValues = (object, keys) => {
  const errors = {};
  for (const key of keys) {
    if (isEmpaty(object[key])) {
      errors[key] = 'required';
    }
  }
  return {
    isValid: isEmpaty(errors),
    errors,
  };
};

export const userAuthorization = (req, res, next) => {
  const errors = {};
  if (parseFloat(req.user.id) === parseFloat(req.params.id)) {
    return next();
  }
  errors.message = 'Unthorized';
  return res.status(401).json({ errors });
};
