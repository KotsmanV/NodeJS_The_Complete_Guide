import * as Sequelize from "sequelize";

export const UserAttributes:Sequelize.ModelAttributes<Sequelize.Model<any, any>, any> = {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:Sequelize.STRING
}