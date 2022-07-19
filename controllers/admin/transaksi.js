import Model from '../../models/index.js'

export const getAllCashier = async (req, res) => {
  const session_store = req.session;
  const barang = await Model.Barang.findAll();
  res.render('pages/cashier',{
    layout: 'layouts/admin',
    user: session_store,
    carts: session_store.carts,
    goods: barang,
    url: req.originalUrl,
  });
}

export const getAllTransaksi = async (req, res) => {
  const session_store = req.session;
  const transaksi = await Model.Transaksi.findAll();
  res.render('pages/transaksi',{
    layout: 'layouts/admin',
    user: session_store,
    transaksi: transaksi,
    url: req.originalUrl,
  });
}



export const getTransaksi = async (req, res) => {
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
  res.render('pages/detailTransaksi',{
    layout: 'layouts/admin',
    user: session_store,
    transaksi: transaksi,
    detail: detail,
    url: req.originalUrl,
  });
}