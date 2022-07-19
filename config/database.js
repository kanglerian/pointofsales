import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('POS','root','',{
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

try {
  sequelize.authenticate();
  console.log('Database Connected.');
} catch (error) {
  console.log('Database not Connected.');
}

export default sequelize;