import dotenv from 'dotenv';
import bcrpty from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models';

dotenv.config();
const { User } = models;

export default class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      return bcrpty.compare(password, user.password, (error, match) => {
        if (match) {
          const payload = {
            id: user.id,
            email: user.email,
          };
          jwt.sign(
            payload,
            process.env.SECRET_OR_KEY,
            { expiresIn: '1d' },
            (err, token) => res.json({ token }),
          );
        } else {
          res.status(400).json({ message: 'Invalid email or password' });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async current(req, res) {
    res.json({ user: req.user });
  }
}
