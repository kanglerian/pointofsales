import Sequelize from 'sequelize';
import Model from '../../models/index.js'
const Op = Sequelize.Op;

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
  const detail = await Model.DetailTransaksi.findAll();
  res.render('pages/transaksi',{
    layout: 'layouts/admin',
    user: session_store,
    transaksi: transaksi,
    url: req.originalUrl,
    detail: detail,
  });
}

export const getTransaksiByDate =  async (req, res) => {
  const session_store = req.session;
  const transaksi = await Model.Transaksi.findAll({
    where: {
      tanggal: {
        [Op.between]: [`${req.body.awal}`, `${req.body.akhir}`]
      }
    }
  });
  const detail = await Model.DetailTransaksi.findAll({
    where: {
      tanggal: {
        [Op.between]: [`${req.body.awal}`, `${req.body.akhir}`]
      }
    }
  });
  res.render('pages/transaksi',{
    layout: 'layouts/admin',
    user: session_store,
    transaksi: transaksi,
    url: req.originalUrl,
    detail: detail,
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

export const updateTransaksi = async (req, res) => {
  try {
    const data = req.body;
    await Model.Transaksi.update(data,{
      where: {
        no_trx: req.body.trx
      }
    });
    res.redirect('back');
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}

export const deleteTransaksi = async (req, res) => {
  try {
    await Model.Transaksi.destroy({
      where: {
        no_trx: req.body.trx
      }
    });
    await Model.DetailTransaksi.destroy({
      where: {
        no_trx: req.body.trx
      }
    });
    res.redirect('back');
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}

export const getInvoice = async (req, res) => {
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
  res.render('pages/faktur', {
    layout: 'layouts/faktur',
    detail,
    transaksi,
    user: session_store
  });
}