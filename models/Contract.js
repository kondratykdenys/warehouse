module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define(
    "Contract",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateOfAssebly: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      typeOfProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      countOfProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      container: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "contracts",
      timestamps: false,
    }
  )

  Contract.associate = models => {
    Contract.belongsTo(models.Client, { as: "client", foreignKey: "user" })
    Contract.belongsTo(models.Product, {
      as: "product",
      foreignKey: "typeOfProduct",
    })
    Contract.belongsTo(models.Container, {
      foreignKey: "container",
    })
    Contract.hasMany(models.Ttn, { as: "ttn", foreignKey: "id" })
  }

  return Contract
}
