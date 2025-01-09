import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class Audio extends Model<InferAttributes<Audio>, InferCreationAttributes<Audio>> {
  declare name: string;

  static associate(models) {
  }
}

export default (sequelize: Sequelize) => {
  Audio.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Audio',
    }
  );

  Audio.beforeCreate((Audio, options) => {

  });

  return Audio;
};
