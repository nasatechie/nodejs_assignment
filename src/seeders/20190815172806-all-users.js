"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "nasa",
          lastName: "pallapotu",
          email: "nagasai_pallapotu@epam.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Naga",
          lastName: "Sai",
          email: "naga_sai@epam.com",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
