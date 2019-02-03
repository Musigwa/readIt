import models from '../models';

const { User, Post } = models;

export default class PostController {
  static async create(req, res) {
    try {
      const {
        title, content, userId, views, mediaPath,
      } = req.body;
      // fetch user
      const UserResponse = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!UserResponse) {
        return res.status(404).send({ message: 'User not found', status: 404 });
      }
      const { dataValues } = await Post.create({
        title,
        content,
        userId: UserResponse.dataValues.id,
        views,
        mediaPath,
      });
      return res.status(201).send({
        message: 'Post Posted Successfully',
        status: 201,
        post: dataValues,
      });
    } catch (error) {
      return res.status(500).send({ message: error.stack, status: 500 });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    try {
      const response = await Post.destroy({ where: { id, userId } });
      return response
        ? res.status(201).send({ message: 'Post deleted Successfully', status: 201 })
        : res.status(404).send({ message: 'Post not found', status: 404 });
    } catch (error) {
      return res.status(500).send({ message: error.stack, status: 500 });
    }
  }
}
