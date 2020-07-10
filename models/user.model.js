module.exports = (sequelize, Sequelize) => {
    const UserModel = sequelize.define("users", {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobile_number: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return UserModel;
  };