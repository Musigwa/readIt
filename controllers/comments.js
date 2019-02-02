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
        res.status(500).json(err);
      } else {
        Comment.create({ postId, userId, text })
          .then((response) => {
            res.status(201).json(response);
          })
          .catch(error => res.status(500).json({ message: 'error occured', error }));
      }
    });
  }

  static async update(req, res) {
    const id = req.params.commentId;
    const { text } = req.body;
    try {
      const newComment = await Comment.update({ text }, { where: { id } });
      res.status(201).json({ message: 'Comment updated successfully', newComment });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async delete(req, res) {
    const id = req.params.commentId;
    try {
      const deletedComment = await Comment.destroy({
        where: { id },
      });
      res
        .status(200)
        .json({ message: 'Comment deleted successfully', deletedComment });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async fetchComments(req, res) {
    const { postId } = req.params;
    try {
      const comments = await Comment.findAll({ postId });
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
