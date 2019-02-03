import moment from 'moment';
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
      return res.status(500).send({ message: error, status: 500 });
    }
  }

  static async editPost(req, res) {
    try {
      const { postId } = req.params;
      const {
        title, content, views, mediaPath,
      } = req.body;

      const postResponse = await Post.findOne({
        where: {
          id: postId,
        },
      });

      if (!postResponse) {
        return res.status(404).send({ message: 'The post does not exist' });
      }
      const { dataValues } = await postResponse.update({
        title, content, views, mediaPath, updatedAt: moment().format(),
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
        return res.status(404).send({ message: 'The post does not exist', status: 404 });
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

  static async getAllPost(req, res) {
    try {
      const postResponse = await Post.findAll();
      if (!postResponse) {
        return res.status(404).send({ message: 'No posts available' });
      }

      return res.status(200).send({
        message: 'All posts',
        status: 200,
        posts: postResponse,
      });
    } catch (error) {
      return res.status(500).send({ message: error, status: 500 });
    }
  }
}
