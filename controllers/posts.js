import Posts from '../models/post';

export default class Post {
  static async create(req, res) {
    const {
      title, content, userId, views, mediaPath,
    } = req.body;
    await Posts.create({
      title,
      content,
      userId,
      views,
      mediaPath,
    }).then((post) => {
      res.json({
        status: 201,
        message: 'create post',
        post,
      });
    });
  }
}
