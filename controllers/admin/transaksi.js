import Model from '../../models/index.js'

export const getAllTransaksi = async (req, res) => {
  const session_store = req.session;
  const barang = await Model.Barang.findAll();
  res.render('pages/transaksi',{
    layout: 'layouts/admin',
    user: session_store,
    carts: session_store.carts,
    goods: barang,
  });
}
