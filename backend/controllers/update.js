import createConnection from '../db.js';

// Create a connection to the MySQL server
export async function update(req, res) {
  const connection = createConnection();

  // Parse the dateOfBirth string into a JavaScript Date object if present in the request body
  if (req.body.dateOfBirth) {
    req.body.dateOfBirth = new Date(req.body.dateOfBirth);
  }

  const { email } = req.body; // Assuming email is the parameter for identifying the entity to update
  const userData = req.body;

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Connected to database');

    connection.query('UPDATE Person SET ? WHERE email = ?', [userData, email], (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Error updating data' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Entity not found' });
        return;
      }
      console.log('Data updated successfully');

      // Fetch the updated data from the database
      connection.query('SELECT * FROM Person WHERE email = ?', [email], (err, rows) => {
        if (err) {
          console.error('Error fetching updated data:', err);
          res.status(500).json({ error: 'Error fetching updated data' });
          return;
        }
        if (rows.length === 0) {
          res.status(404).json({ error: 'Updated entity not found' });
          return;
        }

        const updatedData = rows[0]; // Assuming only one record is updated
        res.status(200).json({ message: 'Data updated successfully', updatedData });

        // Close the connection after fetching and responding with the updated data
        connection.end((err) => {
          if (err) {
            console.error('Error closing connection:', err);
            return;
          }
          console.log('Connection closed');
        });
      });
    });
  });
}
