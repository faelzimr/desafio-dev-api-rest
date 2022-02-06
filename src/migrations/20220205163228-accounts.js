module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'accounts',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        balance: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          defaultValue: 0,
        },
        number: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: 'account_unique',
        },
        agency: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: 'account_unique',
        },
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        blocked: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        bearer_id: {
          type: Sequelize.UUID,
          references: { model: 'bearers', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          account_unique: {
            customIndex: true,
            fields: ['number', 'agency'],
          },
        },
      },
    ),
  down: (queryInterface) => queryInterface.dropTable('accounts'),
};
