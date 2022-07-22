import Model from '../../models/index.js'
import ExcelJS from 'exceljs';

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

export const updateBarang = async (req, res) => {
  try {
    const data = req.body;
    await Model.Barang.update(data,{
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

export const getAllExcel = async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('My Sheet');
  const path = "../Downloads";
  const Data = await Model.Barang.findAll();
  sheet.columns = [
    { header: 'ID', key: 'id', width: 10, },
    { header: 'Nama Barang', key: 'nama_barang', width: 32 },
    { header: 'Supplier', key: 'vendor', width: 32 },
    { header: 'Qty', key: 'qty', width: 32 },
    { header: 'Harga', key: 'harga', width: 32 },
    { header: 'Harga Beli', key: 'harga_beli', width: 32 },
  ];
  Data.forEach((element) => {
    sheet.addRow({
      id: element.id,
      nama_barang: element.nama_barang,
      vendor: element.vendor,
      qty: element.qty,
      harga: element.harga,
      harga_beli: element.harga_beli
    });
  });

  sheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  sheet.getColumn(5).numFmt = '"Rp"#,##0;[Red]\-"£"#,##0';
  sheet.getColumn(6).numFmt = '"Rp"#,##0;[Red]\-"£"#,##0';

  try {
    const data = await workbook.xlsx.writeFile(`${path}/data-barang.xlsx`)
    .then(() => {
      res.redirect('back');
    });
  } catch (error) {
    res.send(error.message);
  }
};
