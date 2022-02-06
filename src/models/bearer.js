module.exports = (sequelize, DataTypes) => {
  const Bearer = sequelize.define(
    'Bearer',
    {
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      tableName: 'bearers',
    },
  );

  Bearer.prototype.toJSON = function returnValues() {
    const fields = ['createdAt', 'updatedAt'];
    const values = { ...this.get() };

    return Object.fromEntries(Object.entries(values).filter(([key]) => !fields.includes(key)));
  };

  return Bearer;
};
