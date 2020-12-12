module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "clients",
      timestamps: false,
    }
  )

  return Client
}
