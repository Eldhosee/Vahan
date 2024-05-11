import createConnection from '../db.js';

// Create a connection to the MySQL server
export async function remove(req, res) {
  const connection = createConnection();
  console.log(req.params)
  const { email } = req.params; // Assuming email is the parameter for identifying the entity to delete

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Connected to database');

    connection.query('DELETE FROM Person WHERE email = ?', [email], (err, result) => {
      if (err) {
        console.error('Error deleting data:', err);
        res.status(500).json({ error: 'Error deleting data' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Entity not found' });
        return;
      }
      console.log('Data deleted successfully');
      res.status(200).json({ message: 'Data deleted successfully' });

      // Close the connection after deletion
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
