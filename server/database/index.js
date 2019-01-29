import config from 'config';
import Sequelize from 'sequelize';

const connectionString = config.get('DATABASE_URL');
export default class Database {
  static connection() {
    return new Sequelize(connectionString);
  }
}
