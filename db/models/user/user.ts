import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare username: string;

  static associate(models) {
  }
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate((user, options) => {

  });

  return User;
};
