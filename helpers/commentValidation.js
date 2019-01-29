import joi from 'joi';

const comment = joi.object().keys({
  userId: joi
    .number()
    .integer()
    .required(),
  postId: joi
    .number()
    .integer()
    .required(),
  text: joi.string().required(),
});
export default comment;
