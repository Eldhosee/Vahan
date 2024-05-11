import createConnection from '../db.js';

// Create a connection to the MySQL server
export async function read(req, res) {
  const connection = createConnection();

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Connected to database');

    connection.query('SELECT * FROM Person', (err, rows) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Error fetching data' });
        return;
      }
      console.log('Data fetched successfully');
      res.status(200).json({ data: rows });

      // Close the connection after fetching and responding with the data
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
