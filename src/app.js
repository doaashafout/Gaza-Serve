const express = require('express');
const cors = require('cors');
const categoryRoutes = require('./routes/category.routes');
const userRoutes = require('./routes/user.routes');
const requestRoutes = require('./routes/request.routes');
const technicianRoutes = require('./routes/technician.routes');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'GazaServe backend is running' });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/technicians', technicianRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
