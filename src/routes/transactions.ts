import { FastifyInstance } from "fastify"
import { randomUUID } from "node:crypto"
import { z } from "zod"
import { knex } from "../database"
export async function transactionsRoutes(app: FastifyInstance) {
    app.get('/hello', async()=>{
        const insert = await knex('transactions').insert({
            id: randomUUID(),
            title:'teste02',
            amount:900.00
        }).returning('*')
        return insert
    })
    app.post('/', async (request, reply) => {
        const createTransactionsBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit','debit']),
        })
        const {title, amount, type} = createTransactionsBodySchema.parse(request.body)
        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type == 'credit' ? amount : amount * -1 ,
        })
        return reply.status(201).send()
     })
}