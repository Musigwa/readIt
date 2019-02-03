import joi from 'joi';

const ratingOne = joi.object().keys({
  userId: joi
    .number()
    .integer()
    .required()
    .label('Please Provide a valid user id'),
  postId: joi
    .number()
    .integer()
    .required()
    .label('The post id should be an integer'),
  ratingId: joi
    .number()
    .integer()
    .label('Provide a valida raking id'),
  rating: joi
    .number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .label('Please provide a valid rating')
});
const ratingAll = joi.object().keys({
  userId: joi
    .number()
    .integer()
    .required()
    .label('Please Provide a valid user id'),
  postId: joi
    .number()
    .integer()
    .required()
    .label('The post id should be an integer')
});
export { ratingOne, ratingAll };
