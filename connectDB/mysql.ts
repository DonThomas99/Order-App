import mysql from 'mysql';

const db_mysql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'OrderApp',
});

const connectToMySQL = async () => {
  return new Promise((resolve, reject) => {
    db_mysql.connect(error => {
      if (error) {
        reject(error);
      } else {
        console.log('Successfully connected to MySQL');
        resolve(db_mysql);
      }
    });
  });
};

connectToMySQL()

export { connectToMySQL };
