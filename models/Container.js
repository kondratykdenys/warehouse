module.exports = (sequelize, DataTypes) => {
  const Container = sequelize.define(
    "Container",
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
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "containers",
      timestamps: false,
    }
  )

  Container.associate = models => {
    Container.hasMany(models.Contract, { foreignKey: "id" })
  }

  return Container
}
