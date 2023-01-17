import debugLib from 'debug';
import { QueryTypes, Sequelize } from 'sequelize';
import config from '../config';

const debug = debugLib('bdb:database');

export const sequelizeMySQL: Sequelize = establishConnection();

function establishConnection() {
    const databaseInstance = sequelizeMySQL;
    if (!databaseInstance) {
        debug('Starting the database connection.');
        return new Sequelize(
            '',
            config.databaseUser,
            config.databasePass,
            {
                dialect: 'mysql',
                host: config.databaseHost,
                logging: false,
                pool: {
                    acquire: Number(config.databesePoolAcquiere),
                    idle:Number(config.databesePoolIdle),
                    max:Number(config.databesePoolMax),
                    min:Number(config.databesePoolMin)
                },
                port: Number(config.databasePort)
            }
        );
    }
    return databaseInstance;
}

const executeSQL = async (sentence: string, queryType: QueryTypes, sqlData?: any, transaction?: any): Promise<any> => {
    try {
        const print = config.logSentenceSQL ? sentence.replace(/\s+/g, ' ') : queryType.toString();
        debug('Execute SQL statement: %s', print);
        return new Promise((resolve, reject) => {
            sequelizeMySQL.query(sentence, {
                bind: sqlData,
                transaction,
                type: queryType
            }).then((result) => resolve(result))
                .catch((err) => reject(err));
        });
        } catch (error) {
            const errorBd: any =  error;
            debug('Database connection error: %s', errorBd);
            return Promise.reject({ message: 'An error occurred with the connection to the database.', errorBd });
        }
};

export { executeSQL };
