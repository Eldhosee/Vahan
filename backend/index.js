import express from 'express';
import bodyParser from 'body-parser';
import entityRoutes from './routes/route.js'; 
import cors from 'cors'
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/api', entityRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
