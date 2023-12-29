import * as Sequelize from "sequelize";
import { dbContext } from '../../data.access/database';

export const User = dbContext.define('user',{
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
});