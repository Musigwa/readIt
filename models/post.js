export default (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      views: DataTypes.INTEGER,
      mediaPath: DataTypes.STRING
    },
    {}
  );
  Post.associate = models => {
    Post.belongsTo(models.User);
    Post.hasMany(models.Rating);
    Post.hasMany(models.Comment);
  };
  return Post;
};
