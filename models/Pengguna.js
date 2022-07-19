import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Pengguna = db.define('pengguna',{
  nik: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
  }
},{
  freezeTableName: true,
  timestamps: false
});

export default Pengguna;