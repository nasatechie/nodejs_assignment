import Sequelize from "sequelize";
import User from "../models/user";
import Product from "../models/products";
import dbSettings from "../config/config.json";

const env = process.env.NODE_ENV || "development";
const dbEnvSettings = dbSettings[env];
const { dialect, username, password, host, database, port } = dbEnvSettings;

const url = `${dialect}://${username}:${password}@${host}:${port}/${database}`;
export const sequelize = new Sequelize(url);

export const userModel = User(sequelize, Sequelize);
export const productModel = Product(sequelize, Sequelize);
