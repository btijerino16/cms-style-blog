const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../db/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    
    checkPassword(pw) {
        return bcrypt.compareSync(pw, this.password);
      }
}
User.init({
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        allowNull: false, 
        autoIncrement: true 
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            len: [1] 
        }
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: {
            isEmail: true 
        }
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: {
            len: [4] 
        }

    }
},
    {
        hooks: {
            
            async beforeCreate(newData) {
              newData.password = await bcrypt.hash(newData.password, 10);
              return newData;
            },
            
            async beforeUpdate(updatedData) {
              updatedData.password = await bcrypt.hash(updatedData.password, 10);
              return updatedData;
            }
          },
        
        sequelize, 
        timestamps: false, 
        freezeTableName: true,
        underscored: true,
        modelName: 'user' 
    }
);

module.exports = User;