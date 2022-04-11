module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
   title: DataTypes.STRING,
   content: DataTypes.STRING,
  },
  { 
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.user,
      { foreignKey: 'user_id', as: 'userId' });
  };
  
   return BlogPost;
 };