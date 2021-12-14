'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          id: 1,
          fullName: 'user1',
          email: 'user1@test.com',
          dob: '11.08.2001',
          password: '456',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          fullName: 'user2',
          email: 'user2@test.com',
          dob: '11.11.2004',
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          fullName: 'user3',
          email: 'user3@test.com',
          dob: '12.11.2002',
          password: '321',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          fullName: 'user3',
          email: 'user4@test.com',
          dob: '12.11.2002',
          password: '321',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'role',
      [
        {
          id: 1,
          value: 'role1',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          value: 'role2',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('role', null, {});
    await queryInterface.bulkDelete('user', null, {});

  },
};
