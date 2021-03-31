const Schemes = require('./scheme-model')
const ExpressError = require('../ExpressError');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Schemes.findById(req.params.id).first()
    if (scheme) {
      next();
    } else {
      next(new ExpressError(`scheme with scheme_id ${req.params.id} not found`, 404))
    }
  } catch (err) {
    next(new ExpressError(err, 500))
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try {
    const body = req.body;
    if (!body.scheme_name) {
      next(new ExpressError('invalid scheme_name', 400))
    } else if (body.scheme_name.length === 0) {
      next(new ExpressError('invalid scheme_name', 400))
    } else if (typeof body.scheme_name !== 'string') {
      next(new ExpressError('invalid scheme_name', 400))
    } else {
      next()
    }
  } catch (err) {
    next(new ExpressError(err, 500))
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  try {
    const body = req.body;
    if (!body.instructions) {
      next(new ExpressError('invalid step', 400))
    } else if (body.instructions.length === 0) {
      next(new ExpressError('invalid step', 400))
    } else if (typeof body.instructions !== 'string') {
      next(new ExpressError('invalid step', 400))
    } else if (typeof body.step_number !== "number") {
      next(new ExpressError('invalid step', 400))
    } else if (body.step_number < 1) {
      next(new ExpressError('invalid step', 400))
    } else {
      next()
    }
  } catch (err) {
    next(new ExpressError(err, 500))
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
