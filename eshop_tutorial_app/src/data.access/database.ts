import { Sequelize } from 'sequelize';
import { environment } from '../environment';
import { User, defineTableRelations } from './model.definitions';

const dbContext = new Sequelize({
    dialect: 'mssql',
    database:'node_complete',
    dialectOptions: {
        connectionString: environment.sql.connectionString,

        //wher using MSSQL with Windows Authentication,
        //it must be set as below
        authentication: {
            type: 'ntlm',
            options: {
                userName: environment.sql.username,
                password: environment.sql.password,
                domain: environment.sql.domain,
            }
        }
    },
});

// const dbContext = new Sequelize(environment.sql.mysql);


function initializeDatabase() {
    defineTableRelations();
    return dbContext.sync({
        // force:true
    }).then(() => {
        return User.findByPk(1);
    }).then(user => {
        if (!user) {
            return User.create({
                name: 'prometheus_666',
                email: 'prometheus.666@gmail.com'
            })
        }
        return user;
    }).then(user=>{
        //@ts-ignore
        return user.createCart();
    }).catch(error=> console.log(`db initialization error`));
}


export {
    dbContext,
    initializeDatabase
}
