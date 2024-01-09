import * as Sequelize from "sequelize";

export const SessionAttributes:Sequelize.ModelAttributes<Sequelize.Model<any, any>, any> = {
    sessionId:{
        type:Sequelize.STRING(450),
        allowNull:false,
        primaryKey:true
    },
    sessionData:{
        type:Sequelize.TEXT,
        allowNull:true
    },
    lastTouchedUtc:{
        type:Sequelize.DATE,
        allowNull:false
    }

}