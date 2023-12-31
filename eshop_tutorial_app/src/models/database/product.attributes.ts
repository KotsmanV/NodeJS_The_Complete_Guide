import * as Sequelize from "sequelize";

export const ProductAttributes:Sequelize.ModelAttributes<Sequelize.Model<any, any>, any> = {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    // title:Sequelize.STRING,
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.DECIMAL(5,2),
        allowNull:false
    },
    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
};