import * as fs from "fs";
import * as path from "path";
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import configEnv from "../../config/index";
import { Audio } from "./audio/audio";
import { User } from "./user/user";

const basename = path.basename(__filename);
const env = configEnv().env || "development";
const config = require(path.resolve("./config", "config.ts"))[env];
console.log(config, "database configs");

interface Db {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  models: {
    User: ModelStatic<User>;
    Audio: ModelStatic<Audio>;

    [key: string]: ModelStatic<Model>;
  };
}

const sequelizeInstances: { [key: string]: Sequelize } = {};

const db: Db = {
  sequelize: {} as Sequelize,
  Sequelize: Sequelize,
  models: {
    User: User,
    Audio: Audio
  },
};

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

const ext = process.env.NODE_ENV !== 'development' ? '.js' : '.ts';

for (let i = 0; i < databases.length; ++i) {
  const database = databases[i].toLowerCase();

  fs.readdirSync(path.join(__dirname, database))
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ext
      );
    })
    .forEach((file) => {
      const modelFactory = require(path.join(__dirname, database, file));
      if (modelFactory && modelFactory.default) {
        const model = modelFactory.default(sequelizeInstances[databases[i]] as Sequelize, DataTypes) as ModelStatic<Model>;
        db.models[model.name] = model;
      }
    });
}
Object.keys(db.models).forEach((modelName) => {
  const model = db.models[modelName];
  if ('associate' in model) {
    (model as any).associate(db.models);
  }
});

export { db, sequelizeInstances };

