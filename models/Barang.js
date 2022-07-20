import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Barang = db.define('barang',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nama_barang: {
    type: DataTypes.STRING
  },
  vendor: {
    type: DataTypes.STRING
  },
  qty: {
    type: DataTypes.INTEGER
  },
  harga: {
    type: DataTypes.INTEGER
  }
},{
  freezeTableName: true,
  timestamps: false
});

export default Barang;