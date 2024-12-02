const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const expenses = sequelize.define(
  "expenses",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "expenses",
    timestamps: true,
  }
);


// (async ()=> {
//    try{
//         await sequelize.sync();
//    }catch(error){

//    }
// })();

module.exports = expenses;
