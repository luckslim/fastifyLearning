import {knex as Setupknex} from "knex";
export const knex = Setupknex({
    client:'sqlite',
    connection:{
        filename:'./tmp/app.db'
    },
    useNullAsDefault: true,
})