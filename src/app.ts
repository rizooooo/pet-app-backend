import Express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { PetRoutes } from '../routes';
import { ConnectDB } from '../config';
import cors from 'cors';


dotenv.config({ path: './config/config.env' });

ConnectDB();

const app: Application = Express();
const router = Express.Router();

app.use(cors())
app.use(Express.json());
app.use('/api/v1', router);


router.use('/pet', PetRoutes);


const PORT = process.env.PORT || 4000;


app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));