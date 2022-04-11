'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostsCategories', {
      postId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      categoryId:{
        type: Sequelize.INTEGER,
        references: {
          onDelete: 'CASCADE',
          model: 'Categories',
          key: 'id'
        },
        primaryKey: true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories')
  }
};