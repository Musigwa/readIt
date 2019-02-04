import bcrypt from 'bcrypt';
import models from '../models';
import { checkValues } from '../helpers/validators';

const { User } = models;

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
 firstName, lastName, email, password 
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
      return res.status(500).json({ message: 'failed', errors: err });
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
      return res.status(500).json({ message: 'failed', errors: err });
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
      return res.status(500).json({ message: 'failed', errors: err });
    }
  }

  // delete user not sure!
}
