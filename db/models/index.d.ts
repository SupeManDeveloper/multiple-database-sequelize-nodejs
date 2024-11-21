import { Model, ModelStatic, Sequelize } from "sequelize";
declare const sequelizeInstances: {
    [key: string]: Sequelize;
};
declare const db: {
    [key: string]: ModelStatic<Model<any, any>>;
};
export { db, sequelizeInstances };
