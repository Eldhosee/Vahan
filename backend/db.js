import mysql from 'mysql2'
const createConnection = () => {
     const connection = mysql.createConnection({
     host: 'localhost',
    user: 'vahan',
    password: 'password@123',
    database: 'vahandb'
    });
    return connection
  };
  
  export default createConnection;