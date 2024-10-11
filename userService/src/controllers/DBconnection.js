const mysql = require('mysql2');

let connection;

exports.getDatabaseConnection = () => {
    if(!connection) {
        connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'Seb8ine8$',
            port: 3306,
            database: 'userServ',
        })
    }
    console.log("got connection")
    return connection;
};

exports.query = (query, params = []) =>
{
  console.log('Executing SQL:', query, 'with parameters:', params);
  return new Promise((resolve, reject) => {
    if(!connection) {
      connection = exports.getDatabaseConnection();
    }
    connection.query(query, params, (err, results, fields) => {
      if(err) {
        reject(err);
        return;
      }
      resolve({
        results: results,
        fields: fields
      })
    })
  });
};

exports.close = () => {
  if(connection) {
    connection.end();
    connection = null;
  }
};
