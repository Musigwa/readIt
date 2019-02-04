import bcrypt from 'bcrypt';
import models from '../models';

const { User, Post } = models;

export default class UserController {
  static async create(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      try {
        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hash,
        });
        user.password = '************';
        res.json({ status: 200, user });
      } catch (error) {
        const { fields, errors } = error;
        res.json({ fields, message: errors ? errors[0].message : 'Unknown error' });
      }
    });
  }

  static async getAllUser(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });
      res.json({ users });
    } catch (err) {
      res.status(500).send({ message: err.stack, status: 500 });
    }
  }

  static async getOneUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: {
          id,
        },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });
      res.json({ user });
    } catch (err) {
      res.status(500).send({ message: err.stack, status: 500 });
    }
  }

  static async update(req, res) {
    const { firstName, lastName } = req.body;
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      });
      const updatedUser = await user.update({
        firstName,
        lastName,
      });
      updatedUser.password = '******';

      res.json({ user: updatedUser });
    } catch (err) {
      res.status(500).send({ message: err.stack, status: 500 });
    }
  }

  static getMyPosts(req, res) {
    const userId = req.user.id;
    Post.findAll({ where: { userId } }).then((dataValues) => {
      if (dataValues.length === 0) {
        return res.status(404).send({ message: 'The post does not exist', status: 404 });
      }
      return res.status(200).send({
        message: 'A post fetched successfully',
        status: 200,
        post: dataValues,
      });
    }).catch((error) => {
      res.status(500).send({ message: error.stack, status: 500 });
    });
  }
  // delete user not sure!
}
