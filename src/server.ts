import app from "./app"
 import {testDbConnection} from './database/config/config';
import dotenv from 'dotenv';

dotenv.config()

const port: number = parseInt(process.env.PORT!,10 );

const connect = async() => {
    await testDbConnection();
}
connect();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });