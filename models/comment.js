export default (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      text: DataTypes.STRING
    },
    {}
  );
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};
