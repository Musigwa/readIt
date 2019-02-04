import bcrypt from 'bcrypt';
import models from '../models';
import { checkValues } from '../helpers/validators';

const { User, Post } = models;

export default class UserController {
  static async create(req, res) {
    const { isValid, errors } = checkValues(req.body, [
      'firstName',
      'lastName',
      'email',
      'password',
    ]);
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const {
      firstName, lastName, email, password,
    } = req.body;

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'failed', errors: err });
      }
      try {
        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hash,
        });
        user.password = '************';
        return res.json({ user });
      } catch (response) {
        if (response.errors[0]) {
          const { message } = response.errors[0];
          message === 'email must be unique'
            ? (errors.message = 'User already exist')
            : (errors.message = message);
        } else {
          errors.message = 'Unknown error';
        }
        return res.status(400).json({ errors });
      }
    });
  }

  static async getAllUser(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });
      return res.json({ users });
    } catch (err) {
      res.status(500).send({ message: err.stack, status: 500 });
    }
  }

  static async getOneUser(req, res) {
    const { id } = req.params;
    const errors = {};
    try {
      const user = await User.findOne({
        where: {
          id,
        },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });
      if (!user) {
        errors.message = 'User not found';
        return res.status(404).json({ errors });
      }
      return res.json({ user });
    } catch (err) {
      res.status(500).send({ message: err.stack, status: 500 });
    }
  }

  static async update(req, res) {
    const { firstName, lastName } = req.body;
    const errors = {};
    try {
      const user = await User.findOne({
        where: {
          id: parseFloat(req.params.id),
        },
        returning: true,
        plain: true,
      });
      if (!user) {
        errors.message = 'User not found';
        return res.status(404).json({ errors });
      }
      const updatedUser = await user.update({
        firstName,
        lastName,
      });
      updatedUser.password = '******';

      return res.json({ user: updatedUser });
    } catch (err) {
      res.status(500).send({ message: err.stack, status: 500 });
    }
  }

  static getMyPosts(req, res) {
    const userId = req.user.id;
    Post.findAll({ where: { userId } })
      .then((dataValues) => {
        if (dataValues.length === 0) {
          return res
            .status(404)
            .send({ message: "User doesn't have any post", status: 404 });
        }
        return res.status(200).send({
          message: 'Posts fetched successfully',
          status: 200,
          post: dataValues,
        });
      })
      .catch((error) => {
        res.status(500).send({ message: error.stack, status: 500 });
      });
  }
  // delete user not sure!
}
