'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('roles', [
      {
        role_name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'Seller',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'Pelanggan',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {
      ignoreDuplicates: true,
      validate: true
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('roles', null, {});

  }
};
