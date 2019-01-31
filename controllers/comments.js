import joi from 'joi';
import models from '../models';
import comment from '../helpers/commentValidation';

const { Comment } = models;
export default class Comments {
  static create(req, res) {
    const postId = req.params.id;
    const userId = req.headers.id;
    const { text } = req.body;
    joi.validate({ postId, userId, text }, comment, (err, value) => {
      if (err) {
        res.status(400).json(err);
      } else {
        Comment.create({ postId, userId, text })
          .then((response) => {
            res.status(201).json(response);
          })
          .catch(error => res.status(500).json({ message: 'error occured', error }));
      }
    });
  }
}
