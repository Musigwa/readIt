import bcrypt from 'bcrypt';
import models from '../models';

const { User } = models;
export default class UserController {
  static create(req, res) {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    bcrypt.hash(password, 10, async (err, hash) => {
      try {
        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hash
        });
        res.json(user);
      } catch (error) {
        console.log(error);
        res.json({ message: 'error ' });
      }
    });
  }
}
