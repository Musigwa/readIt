/* eslint-disable arrow-parens */
export default (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
    },
    {}
  );
  Rating.associate = models => {
    Rating.belongsTo(models.User);
    Rating.belongsTo(models.Post);
  };
  return Rating;
};
