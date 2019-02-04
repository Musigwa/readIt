import moment from 'moment';
import models from '../models';

const { User, Post } = models;

export default class PostController {
  static async create(req, res) {
    const userId = req.user.id;
    try {
      const {
        title, content, views, mediaPath,
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
      return res.status(500).send({ message: error, status: 500 });
    }
  }

  static async editPost(req, res) {
    try {
      const { postId } = req.params;
      const userId = req.user.id;
      const {
        title, content, views, mediaPath,
      } = req.body;

      const postResponse = await Post.findOne({
        where: {
          id: postId,
          userId,
        },
      });

      if (!postResponse) {
        return res
          .status(404)
          .send({ message: 'The post does not exist', status: 404 });
      }
      const { dataValues } = await postResponse.update({
        title,
        content,
        views,
        mediaPath,
        updatedAt: moment().format(),
      });

      return res.status(200).send({
        message: 'The post was updated successfully',
        status: 200,
        post: dataValues,
      });
    } catch (error) {
      return res.status(500).send({ message: error, status: 500 });
    }
  }

  static async getOnePost(req, res) {
    try {
      const { postId } = req.params;

      const postResponse = await Post.findOne({
        where: {
          id: postId,
        },
      });

      if (!postResponse) {
        return res
          .status(404)
          .send({ message: 'The post does not exist', status: 404 });
      }

      return res.status(200).send({
        message: 'A post fetched successfully',
        status: 200,
        post: postResponse,
      });
    } catch (error) {
      return res.status(500).send({ message: error, status: 500 });
    }
  }

  static async updateViewers(req, res) {
    const { id } = req.params;
    try {
      const response = await Post.increment(['views'], { by: 1, where: { id } });
      return response
        ? res.status(201).send({ message: 'Post deleted Successfully', status: 201 })
        : res.status(404).send({ message: 'Post not found', status: 404 });
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

  static async getAllPost(req, res) {
    try {
      const postResponse = await Post.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
      if (!postResponse) {
        return res.status(404).send({ message: 'No posts available' });
      }

      return res.status(200).send({
        message: 'All posts',
        status: 200,
        posts: postResponse,
      });
    } catch (error) {
      console.log(error.stack);
      return res.status(500).send({ message: error.stack, status: 500 });
    }
  }
}
