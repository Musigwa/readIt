import Sequelize from 'sequelize';
import Database from '../database';

const User = Database.connection().define(
  'imigati',
  {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: true },
);

// force: true will drop the table if it already exists
// Table created
User.sync({ force: true }).then(() => {});
