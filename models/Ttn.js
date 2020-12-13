module.exports = (sequelize, DataTypes) => {
  const Ttn = sequelize.define(
    "Ttn",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      contract: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departure: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "ttns",
      timestamps: false,
    }
  )

  Ttn.associate = models => {
    Ttn.belongsTo(models.Contract, { as: "ttn", foreignKey: "contract" })
  }

  return Ttn
}
