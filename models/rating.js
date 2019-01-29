module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
    },
    {},
  );
  Rating.associate = () => {
    // associations can be defined here
  };
  return Rating;
};
