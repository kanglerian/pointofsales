import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Transaksi = db.define('transaksi',{
  no_trx: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nama_pelanggan: {
    type: DataTypes.STRING
  },
  tanggal: {
    type: DataTypes.DATE
  },
  bayar: {
    type: DataTypes.INTEGER
  }
},{
  freezeTableName: true,
  timestamps: false
});

export default Transaksi;