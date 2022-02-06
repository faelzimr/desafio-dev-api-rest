module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    {
      balance: DataTypes.DECIMAL,
      number: DataTypes.STRING,
      agency: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      blocked: DataTypes.BOOLEAN,
      bearerId: {
        type: DataTypes.UUID,
        field: 'bearer_id',
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
      tableName: 'accounts',
    },
  );

  Account.associate = function associate(models) {
    models.Account.belongsTo(models.Bearer, {
      foreignKey: 'bearerId',
      as: 'bearer',
    });
  };

  Account.prototype.toJSON = function returnValues() {
    const fields = ['bearerId', 'createdAt', 'updatedAt'];
    const values = { ...this.get() };

    return Object.fromEntries(Object.entries(values).filter(([key]) => !fields.includes(key)));
  };

  return Account;
};
