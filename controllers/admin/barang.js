import Model from '../../models/index.js'

export const getAllBarang = async (req, res) => {
  const session_store = req.session;
  const barang = await Model.Barang.findAll();
  // res.render('pages/dashboard',{
  //   layout: 'layouts/admin',
  //   user: session_store
  // });
  res.json(barang);
}