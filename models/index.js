import Barang from '../models/Barang.js';
import Transaksi from '../models/Transaksi.js';
import DetailTransaksi from '../models/DetailTransaksi.js';
import Pengguna from '../models/Pengguna.js';
const Model = {};

Model.Barang = Barang;
Model.Pengguna = Pengguna;
Model.Transaksi = Transaksi;
Model.DetailTransaksi = DetailTransaksi;

export default Model;