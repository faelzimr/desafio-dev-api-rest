module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('operations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      value: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      current_balance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      account_id: {
        type: Sequelize.UUID,
        references: { model: 'accounts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      operation_type_id: {
        type: Sequelize.UUID,
        references: { model: 'operation_types', key: 'id' },
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
    }),
  down: (queryInterface) => queryInterface.dropTable('operations'),
};
