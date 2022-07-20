import Model from '../../models/index.js'

export const getAllBarang = async (req, res) => {
  const session_store = req.session;
  const barang = await Model.Barang.findAll();
  res.render('pages/barang', {
    layout: 'layouts/admin',
    user: session_store,
    url: req.originalUrl,
    goods: barang
  });
}

export const addBarang = async (req, res) => {
  try {
    const data = req.body;
    await Model.Barang.create(data);
    res.redirect('back');
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}

export const deleteBarang = async (req, res) => {
  try {
    await Model.Barang.destroy({
      where: {
        id: req.body.id
      }
    });
    res.redirect('back');
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}