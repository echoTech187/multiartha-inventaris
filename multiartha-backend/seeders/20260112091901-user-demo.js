'use strict';

const { hashPassword } = require('../libraries/password');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { hashPassword } = require('../libraries/password');
    const { v4: UUIDV4 } = require('uuid');
    await queryInterface.bulkInsert('users', [{
      slug: UUIDV4(),
      fullname: 'Eko Susanto',
      username: 'eko.susanto',
      email: 'ekosuesanto25@gmail.com',
      password: await hashPassword('password123', 10),
      role_id: 1,
      avatar: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      slug: UUIDV4(),
      fullname: 'User Seller',
      username: 'user.seller',
      email: 'userseller@example.com',
      password: await hashPassword('password456', 10),
      role_id: 2,
      avatar: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      slug: UUIDV4(),
      fullname: 'Pelanggan 1',
      username: 'pelanggan1',
      email: 'pelanggan1@example.com',
      password: await hashPassword('password789', 10),
      role_id: 3,
      avatar: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      ignoreDuplicates: true,
      validate: true
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
