import * as fs from "fs";
import * as path from "path";
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import configEnv from "../../config/index";

const basename = path.basename(__filename);
const env = configEnv().env || "development";
const config = require(path.resolve("./config", "config.ts"))[env];
console.log(config, "database configs");

const sequelizeInstances: { [key: string]: Sequelize } = {};
const db: { [key: string]: ModelStatic<Model<any, any>> } = {};
const databases = Object.keys(config.databases);

for (let i = 0; i < databases.length; ++i) {
  const database = databases[i];
  const dbPath = config.databases[database];
  if (config.use_env_variable) {
    sequelizeInstances[database] = new Sequelize(process.env[config.use_env_variable] as string, config);
  } else {
    sequelizeInstances[database] = new Sequelize(
      dbPath.database,
      dbPath.username,
      dbPath.password,
      dbPath
    );
  }
}

for (let i = 0; i < databases.length; ++i) {
  const database = databases[i].toLowerCase();

  fs.readdirSync(path.join(__dirname, database))
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      const modelFactory = require(path.join(__dirname, database, file));
      const model = modelFactory(sequelizeInstances[databases[i]] as Sequelize, DataTypes);

      if (model && model.name) {
        db[model.name] = model as ModelStatic<Model<any, any>>;
      }
    });
}

Object.keys(db).forEach((modelName) => {
  const model = db[modelName];
  if (typeof model === "function" && "associate" in model) {
    (model as any).associate(db);
  }
});

export { db, sequelizeInstances };

