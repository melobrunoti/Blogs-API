module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define(
    'PostCategories', {}, { timestamps: false },
    );

    PostCategories.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
         as: 'postId',
         foreignKey: 'postId',
         through: 'PostCategories',
         otherKey: 'categoryId',
        });

      models.Category.belongsToMany(models.BlogPost, {
        as: 'categoryId',
        foreignKey: 'categoryId',
        through: 'PostCategories',
        otherKey: 'postId',
      });
  };
  
   return PostCategories;
 };