import { Sequelize } from 'sequelize';
import { environment } from '../environment';
import { Product } from '../models/product';

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

export {
    dbContext
}
