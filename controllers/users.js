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
        res.json({ user });
      } catch (error) {
        const { fields, errors } = error;
        console.log(error);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    }
  }

  static getMyPosts(req, res) {
    const { id } = req.params;
    Post.findAll({ where: { userId: id } }).then((dataValues) => {
      if (!dataValues) {
        return res.status(404).send({ message: 'The post does not exist', status: 404 });
      }
      return res.status(200).send({
        message: 'A post fetched successfully',
        status: 200,
        post: dataValues,
      });
    }).catch((error) => {
      res.status(500).send({ message: error, status: 500 });
    });
  }
  // delete user not sure!
}
