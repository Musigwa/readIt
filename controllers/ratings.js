/* eslint-disable no-underscore-dangle */
import joi from 'joi';
import models from '../models';
import { ratingOne, ratingAll } from '../helpers/ratingValidation';

const { Rating, sequelize } = models;

class RatingController {
  static create(req, res, next) {
    const postId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { rating } = req.body;
    joi.validate({ postId, userId, rating }, ratingOne, (err, value) => {
      if (err) {
        next(err);
      } else {
        Rating.create({ postId, userId, rating })
          .then(response => {
            if (response._options.isNewRecord) {
              res.status(201).json({ message: 'Post rated successfully' });
            }
          })
          .catch(error => {
            // check if the error is related to the post id not find in table
            if (
              error.name === 'SequelizeForeignKeyConstraintError' &&
              error.index === 'Ratings_postId_fkey'
            ) {
              res.status(404).json({ message: 'Post you are looking for cannot be found' });
            } else {
              res.status(500).json({ message: 'Please Try again later' });
            }
          });
      }
    });
  }

  static getAll(req, res, next) {
    const postId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    joi.validate({ userId, postId }, ratingAll, (err, value) => {
      if (err) {
        next(err);
      } else {
        // Ps: user raw query because using findOne was causing errors because of table naming
        sequelize
          .query('SELECT * FROM "Ratings"  WHERE "postId" =:postId', {
            replacements: { postId },
            type: sequelize.QueryTypes.SELECT
          })
          .then(result => {
            res.status(200).json({ ratings: result });
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Please Try again later' });
          });
      }
    });
  }
}

export default RatingController;
