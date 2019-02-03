import joi from 'joi';

const rating = joi.object().keys({
  userId: joi
    .number()
    .integer()
    .required(),
  postId: joi
    .number()
    .integer()
    .required(),
  rating: joi
    .number()
    .integer()
    .min(1)
    .max(5)
    .required()
});
export default rating;
