module.exports = (sequelize, DataTypes) => {
 const User = sequelize.define('User', {
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  image: DataTypes.STRING,
 }, { timestamps: false });

 User.associate = (models) => {
  User.hasOne(models.BlogPost,
    { foreignKey: 'userId', as: 'blogPost' });
};
  return User;
};