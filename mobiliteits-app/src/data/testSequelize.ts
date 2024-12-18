import { Sequelize } from "sequelize-typescript";
import config from "dotenv";

config.config({ path: "./config.env" })

const testSequelize = new Sequelize({
    database: 'mobiliteits-app-test',
    dialect: 'mysql',
    username: process.env.USER_RELATIONAL_DB,
    password: process.env.PASSWORD_RELATIONAL_DB,
    models: [__dirname + '\\models'],
    logging: false
});

export default testSequelize;
