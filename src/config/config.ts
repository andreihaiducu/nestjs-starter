import * as dotenv from 'dotenv'
import * as joi from 'joi'

dotenv.config()
const envVarsSchema = joi.object({
    DB_HOST: joi.string().default('localhost'),
    DB_NAME: joi.string(),
    DB_PORT: joi.number().default(3306),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    NODE_ENV: joi.string().allow(['development', 'production']),
    PORT: joi.number().default(5000),
    JWT_SECRET: joi.string().required(),
}).unknown().required()

const {error , value: envVars } = joi.validate(process.env, envVarsSchema)
if(error) {
    throw new Error(`Config validation error ${error.message}`)
}

export default {
    env: envVars.NODE_ENV,
    isDevelopment: envVars.NODE_ENV === 'development',
    serverPort: +(envVars.PORT || 5000),
    dbHost: envVars.DB_HOST,
    dbName: envVars.DB_NAME,
    dbPort: +(envVars.DB_PORT || 3306),
    dbUserName: envVars.DB_USERNAME,
    dbPassword: envVars.DB_PASSWORD,
    jwtSecret: envVars.JWT_SECRET,
  };