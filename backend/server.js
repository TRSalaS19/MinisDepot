import express from 'express';
import dotenv from 'dotenv';
import connectDB from './dbConfigs/databaseConfig.js';
import colors from 'colors';
import {notFound , errorHandler} from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const PORT = process.env.PORT || 5000; 

dotenv.config();

connectDB();

const app = express(); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`DB connection is up and running on port ${PORT}`)
});

app.use('/db/products', productRoutes);
app.use('/db/users', userRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is runnig on port: ${PORT} under ${process.env.NODE_ENV} mode`.brightBlue);
});