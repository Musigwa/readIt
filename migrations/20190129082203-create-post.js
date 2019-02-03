module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Posts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    content: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' },
    },
    views: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    mediaPath: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Posts'),
};
