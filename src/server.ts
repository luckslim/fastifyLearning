import fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";
import { knex } from "./database";
import { randomUUID } from "node:crypto";
import cookie from '@fastify/cookie'
const app = fastify();
app.register(cookie)
app.register(transactionsRoutes,{
    prefix:'transactions',
})
app.get('/hello', async()=>{
    const insert = await knex('transactions').insert({
        id: randomUUID(),
        title:'teste02',
        amount:900.00
    }).returning('*')
    return insert
})
app.listen({port: env.PORT }).then(()=>{
    console.log("server is running!!")
})