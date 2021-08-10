import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './dbConfigs/databaseConfig.js';
import morgan from 'morgan';
import colors from 'colors';
import {
  notFound , 
  errorHandler
} from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/imageUploadRoutes.js';

const PORT = process.env.PORT || 5000; 

dotenv.config();

connectDB();

const app = express(); 

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json());

app.use('/db/products', productRoutes);
app.use('/db/users', userRoutes);
app.use('/db/orders', orderRoutes);
app.use('/db/upload', uploadRoutes);


app.get('/db/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send(`DB connection is up and running on port ${PORT}`)
  });
}

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is runnig on port: ${PORT} under ${process.env.NODE_ENV} mode`.brightBlue);
});