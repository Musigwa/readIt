/* eslint-disable arrow-parens */
export default (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      text: DataTypes.STRING,
    },
    {}
  );
  Comment.associate = models => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Post);
  };
  return Comment;
};
