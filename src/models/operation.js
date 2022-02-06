module.exports = (sequelize, DataTypes) => {
  const Operation = sequelize.define(
    'Operation',
    {
      value: DataTypes.DECIMAL,
      currentBalance: {
        type: DataTypes.DECIMAL,
        field: 'current_balance',
      },
      operationTypeId: {
        type: DataTypes.UUID,
        field: 'operation_type_id',
      },
      accountId: {
        type: DataTypes.UUID,
        field: 'account_id',
      },
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
      tableName: 'operations',
    },
  );

  Operation.associate = function associate(models) {
    models.Operation.belongsTo(models.Account, {
      foreignKey: 'accountId',
      as: 'account',
    });
    models.Operation.belongsTo(models.OperationType, {
      foreignKey: 'operationTypeId',
      as: 'operationType',
    });
  };

  Operation.prototype.toJSON = function returnValues() {
    const fields = ['accountId', 'updatedAt'];
    const values = { ...this.get() };

    return Object.fromEntries(Object.entries(values).filter(([key]) => !fields.includes(key)));
  };

  return Operation;
};
