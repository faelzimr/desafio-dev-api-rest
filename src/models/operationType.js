module.exports = (sequelize, DataTypes) => {
  const OperationType = sequelize.define(
    'OperationType',
    {
      name: DataTypes.STRING,
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
      tableName: 'operation_types',
    },
  );

  OperationType.prototype.toJSON = function returnValues() {
    const fields = ['createdAt', 'updatedAt'];
    const values = { ...this.get() };

    return Object.fromEntries(Object.entries(values).filter(([key]) => !fields.includes(key)));
  };

  return OperationType;
};
