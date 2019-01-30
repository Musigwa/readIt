const Posts = require('../models').Post;
const Users = require('../models').User;

export default class Post {
  static async create(req, res) {
    try {
      const {
        title, content, userId, views, mediaPath,
      } = req.body;
      // fetch user
      const UserResponse = await Users.findOne({
        where: {
          id: userId,
        },
      });
      if (!UserResponse) {
        return res.status(404).send({ message: 'User not found', status: 404 });
      }
      const { dataValues } = await Posts.create({
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
      return res.status(400).send({ message: error, status: 400 });
    }
  }
}
