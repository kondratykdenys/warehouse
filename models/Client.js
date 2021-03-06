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

  Client.associate = models => {
    Client.hasMany(models.Contract, { as: "client", foreignKey: "id" })
  }

  return Client
}
