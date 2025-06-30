import "dotenv/config"
import {knex as Setupknex} from "knex";
import { env } from "./env";
export const config = {
    client:'sqlite',
    connection:{
        filename: env.DATABASE_URL,
    },
    migrations:{
        directory:'./migrations',
        extension:'ts'
    },
    useNullAsDefault: true,
}
export const knex = Setupknex(config)