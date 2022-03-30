import express from 'express';
// body parser allwos us to take in incoming post request bodies
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';

const app = express();

// this app.use adds a new middleware to the app
app.use(bodyParser.json())
app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send("Hello from homepage"));

export default app;
