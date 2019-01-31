/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      validate: {
        validEmail() {
          const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!regExp.test(this.email)) {
            throw new Error('Invalid email address');
          }
        },
      },
    }
  );
  User.associate = models => {
    User.hasMany(models.Post, { foreignKey: 'userId_fk', as: 'posts' });
    User.hasMany(models.Rating, { foreignKey: 'userId_fk_rating', as: 'ratings' });
    User.hasMany(models.Comment, {
      foreignKey: 'userId_fk_comments',
      as: 'comments',
    });
  };
  return User;
};
