import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const DetailTransaksi = db.define('detail_transaksi',{
  no_trx: {
    type: DataTypes.STRING,
  },
  nama_barang: {
    type: DataTypes.STRING
  },
  vendor: {
    type: DataTypes.STRING
  },
  harga: {
    type: DataTypes.INTEGER
  },
  jumlah: {
    type: DataTypes.INTEGER
  }
},{
  freezeTableName: true,
  timestamps: false
});

export default DetailTransaksi;