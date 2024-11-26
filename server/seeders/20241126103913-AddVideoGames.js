'use strict';

const VideoGames = require('./result.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert(
    "videogames",
    VideoGames.map((game) => {
      return {
        ...game,
        createdAt:Sequelize.fn("now"),
        updatedAt: Sequelize.fn("now")
      }
    })
   )
  },

  async down (queryInterface, Sequelize) {
   queryInterface.bulkDelete("videogames", {})
  }
};
