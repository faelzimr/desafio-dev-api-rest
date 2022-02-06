module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'operation_types',
      [
        {
          name: 'Saque',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Depósito',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    ),

  down: (queryInterface) => queryInterface.bulkDelete('operation_types', null, {}),
};
