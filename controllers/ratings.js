import joi from 'joi';
import models from '../models';
import ratingValidator from '../helpers/ratingValidation';

const { Rating } = models;

class RatingController {
  static create(req, res, next) {
    const postId = req.params.id;
    const userId = req.headers.id; //???
    const { rating } = req.body;
    joi.validate({ postId, userId, rating }, ratingValidator, (err, value) => {
      if (err) {
        next(err);
      } else {
        Rating.create({ postId, userId, rating })
          .then(response => {
            console.log(response);
            res.status(201).json(response);
          })

          .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'error occured', error });
          });
      }
    });
  }
}

export default RatingController;
