import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { notFoundHandler } from './middleware/notfound';
import { errorHandler } from './middleware/errorHandler';
import areaRouter from './routes/area.routes';
import processRouter from './routes/process.routes';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

// CORS Middleware
const corsOptions = {
  origin: process.env.ENV == 'development' ? '*' : process.env.ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/area', areaRouter);
app.use('/api/process', processRouter);

// Not Found Middleware
app.use(notFoundHandler);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});