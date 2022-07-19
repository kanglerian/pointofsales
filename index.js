import cors from 'cors';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import expressEjsLayouts from 'express-ejs-layouts';
import { getAllDashboard } from './controllers/admin/dashboard.js';
import { getAllCashier, getAllTransaksi, getTransaksi } from './controllers/admin/transaksi.js';
import { getAllBarang } from './controllers/admin/barang.js';

import Model from './models/index.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(expressEjsLayouts);
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('secret'));
app.use(session({ secret: 'secret' }));

app.get('/', (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    layout: 'layouts/auth'
  });
});

var penampungan = [];
app.post('/addCart', async (req, res) => {
  const session_store = req.session;
  session_store.carts = penampungan;
  const barang = await Model.Barang.findOne({
    where: {
      id: req.body.id_barang
    }
  });
  var obj = {
    idCart: req.body.idCart,
    id: barang.id,
    nama_barang: barang.nama_barang,
    vendor: barang.vendor,
    harga: barang.harga,
    jumlah: req.body.jumlah,
  }
  session_store.carts.push(obj);
  res.redirect('back');
});

app.delete('/deleteItem', (req, res) => {
  let idCart = req.body.idCart;
  const session_store = req.session;
  let carts = session_store.carts;
  for (let i = 0; i < penampungan.length; i++) {
    if(carts[i].idCart == idCart){
      carts.splice(i,1)
      penampungan.splice(i,1);
    }
  }
  res.redirect('back');
});

app.post('/checkout', async (req, res) =>{
  const session_store = req.session;
  const transaksi = req.body;
  let detailTransaksi = [];
  let carts = session_store.carts;
  for (let i = 0; i < penampungan.length; i++) {
    var obj = {
      no_trx: req.body.no_trx,
      nama_barang: carts[i].nama_barang,
      vendor: carts[i].vendor,
      harga: carts[i].harga,
      jumlah: carts[i].jumlah,
    };
    detailTransaksi.push(obj);
  }
  await Model.Transaksi.create(transaksi);
  await Model.DetailTransaksi.bulkCreate(detailTransaksi);
  penampungan = [];
  session_store.carts = [];
  res.redirect(`invoice/${req.body.no_trx}`);
});

app.post('/login', (req, res) => {
  const date = new Date();
  const session_store = req.session;
  session_store.username = req.body.username;
  session_store.loggedTime = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  session_store.loggedIn = true;
  res.redirect('/transaksi');
});

app.get('/signup', (req, res) => {
  res.render('auth/signup', {
    title: 'Login',
    layout: 'layouts/auth'
  });
});

app.get('/logout', (req, res) => {
  const session_store = req.session;
  session_store.carts = [];
  penampungan = [];
  req.session.destroy();
  res.redirect('/');
});

app.get('/invoice/:trx', async (req, res) => {
  const session_store = req.session;
  const transaksi = await Model.Transaksi.findOne({
    where: {
      no_trx: req.params.trx
    }
  });
  const detail = await Model.DetailTransaksi.findAll({
    where: {
      no_trx: req.params.trx
    }
  });
  res.render('pages/faktur',{
    layout: 'layouts/faktur',
    detail,
    transaksi,
    user: session_store
  });
});

app.get('/sesi', (req, res) => {
  const session_store = req.session;
  res.send(session_store);
});

app.get('/car', (req,res) => {
  res.send(penampungan);
});

app.use('/dashboard', getAllDashboard);
app.use('/cashier', getAllCashier);
app.use('/transaksi/:trx', getTransaksi);
app.use('/transaksi', getAllTransaksi);
app.use('/barang', getAllBarang);


app.listen(port, () => console.log(`Apps run on http://localhost:${port}`));
