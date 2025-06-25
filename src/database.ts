import {knex as Setupknex} from "knex";
export const config = {
    client:'sqlite',
    connection:{
        filename:'./tmp/app.db'
    },
    migrations:{
        directory:'./migrations',
        extension:'ts'
    },
    useNullAsDefault: true,
}
export const knex = Setupknex(config)