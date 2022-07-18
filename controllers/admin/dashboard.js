export const getAllDashboard = (req, res) => {
  res.render('pages/dashboard',{
    layout: 'layouts/admin'
  });
}