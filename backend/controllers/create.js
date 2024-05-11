import createConnection from '../db.js';

// Create a connection to the MySQL server
export async function create(req, res){
const connection = createConnection();
console.log(req.body)
// Insert data into the user table
const userData = req.body
userData.dateOfBirth = new Date(userData.dateOfBirth);
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  console.log('Connected to database');

  connection.query('INSERT INTO person SET ?', userData, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ error: 'Duplicate entry' });
      } else {
        res.status(500).json({ error: 'Error inserting data' });
      }
      res.status(500).json({ error: 'Error inserting data' });
      
      return;
    }
    console.log('Data inserted successfully');
    res.status(200).json({ message: 'Data inserted successfully' });

    // Close the connection after insertion
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection:', err);
        return;
      }
      console.log('Connection closed');
    });
  });
});
}
