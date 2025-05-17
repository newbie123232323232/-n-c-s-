module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING(255),
      },
      name: {
        type: DataTypes.STRING(100),
      },
      avatarUrl: {
        type: DataTypes.STRING(255),
      },
      bio: {
        type: DataTypes.STRING(500),
      },
      provider: {
        type: DataTypes.STRING(50), // 'local', 'google', 'facebook'
      },
      isTwoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDisabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'Users',
      timestamps: false, // vì bạn đang tự xử lý createdAt, updatedAt bằng SQL
    });
  
    return User;
  };
  