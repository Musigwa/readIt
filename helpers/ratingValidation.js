import joi from 'joi';

const rating = joi.object().keys({
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
  rating: joi
    .number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .label('Please provide a valid rating')
});
export default rating;
