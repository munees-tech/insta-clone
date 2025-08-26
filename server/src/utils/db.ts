import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config()

const Db = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host:process.env.DB_HOST!,
        port:process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
        dialect:'mysql'
    }
);

export const testConnection = async () => {
    try {
       await Db.authenticate()
       console.log('Database connected') 
    } catch (error) {
        console.log(`Database Error ${error}`)
    }
}

testConnection()

export default Db;