module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory', {}, { timestamps: false, tableName: 'PostsCategories' },
    );

    PostCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
         as: 'categories',
         foreignKey: 'postId',
         through: PostCategory,
         otherKey: 'categoryId',
        });

      models.Category.belongsToMany(models.BlogPost, {
        as: 'posts',
        foreignKey: 'categoryId',
        through: PostCategory,
        otherKey: 'postId',
      });
  };
  
   return PostCategory;
 };