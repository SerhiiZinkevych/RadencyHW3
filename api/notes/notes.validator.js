const Joi = require('joi');

module.exports.validateCreateNote = async (req, res, next) => {
  const createUserSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string()
      .valid('Task', 'Random Thought', 'Idea', 'Quote')
      .required(),
    date: Joi.date().required(),
    isActive: Joi.boolean().default(true),
    content: Joi.string().max(1000).required(),
  }).required();
  const result = createUserSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json(result.error);
  }
  next();
};

module.exports.validateUpdateNote = async (req, res, next) => {
  const createUserSchema = Joi.object({
    name: Joi.string(),
    category: Joi.string().valid('Task', 'Random Thought', 'Idea', 'Quote'),
    date: Joi.date(),
    isActive: Joi.boolean().default(true),
    content: Joi.string().max(1000),
  }).required();
  const result = createUserSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json(result.error);
  }
  next();
};
