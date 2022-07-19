import cors from 'cors';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import expressEjsLayouts from 'express-ejs-layouts';
import { getAllDashboard } from './controllers/admin/dashboard.js';
import { getAllTransaksi } from './controllers/admin/transaksi.js';

const app = express();
const port = 3000;

app.set('view engine','ejs');

app.use(cors());
app.use(express.json());
app.use(expressEjsLayouts);
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

app.use(cookieParser('secret'));
app.use(session({secret:'secret'}));

app.get('/', (req, res) => {
  res.render('auth/login',{
    title: 'Login',
    layout: 'layouts/auth'
  });
});

app.post('/', (req, res) => {
  const session_store = req.session;
  session_store.username = `${req.body.username}|session`; 
  session_store.password = `${req.body.password}|session`;
  session_store.detail = [
    {
      name: 'Hanin',
      gender: 'Women'
    },
    {
      name: 'Naima',
      gender: 'Women'
    },
  ];
  res.send(session_store);
});

app.get('/signup', (req, res) => {
  res.render('auth/signup',{
    title: 'Login',
    layout: 'layouts/auth'
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
});

app.get('/sesi', (req, res) => {
  const session_store = req.session;
  res.send(session_store);
});

app.use('/dashboard', getAllDashboard);
app.use('/transaksi', getAllTransaksi);


app.listen(port, () => console.log(`Apps run on http://localhost:${port}`));
