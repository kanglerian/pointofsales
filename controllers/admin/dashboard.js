export const getAllDashboard = (req, res) => {
  const session_store = req.session;
  res.render('pages/dashboard',{
    layout: 'layouts/admin',
    user: session_store
  });
}