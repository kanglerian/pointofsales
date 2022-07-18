export const getAllTransaksi = (req, res) => {
  res.render('pages/transaksi',{
    layout: 'layouts/admin'
  });
}