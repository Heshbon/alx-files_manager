// API Server configuration

import express from 'express';
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

// Set up routes
app.use(express.json());
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
