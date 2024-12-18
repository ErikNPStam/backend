import { Sequelize } from "sequelize-typescript";
import config from "dotenv";

config.config({ path: "./config.env" })

const sequelize = new Sequelize({
    database: process.env.SCHEMA_RELATIONAL_DB,
    dialect: 'mysql',
    username: process.env.USER_RELATIONAL_DB,
    password: process.env.PASSWORD_RELATIONAL_DB,
    models: [__dirname + '\\models'],
    logging: false
});

export default sequelize;
