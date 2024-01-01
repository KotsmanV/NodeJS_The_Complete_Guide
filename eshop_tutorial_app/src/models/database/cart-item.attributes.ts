import * as Sequelize from "sequelize";

export const CartItemAttributes:Sequelize.ModelAttributes<Sequelize.Model<any, any>, any> = {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    quantity:Sequelize.INTEGER
}