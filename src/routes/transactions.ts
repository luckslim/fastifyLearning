import { FastifyInstance } from "fastify"
import { randomUUID } from "node:crypto"
import { z } from "zod"
import { knex } from "../database"
import { checkSessionIdExist } from "../middlewares/check-sessionId-exist"
export async function transactionsRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const createTransactionsBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit','debit']),
        })
        const {title, amount, type} = createTransactionsBodySchema.parse(request.body)
        let sessionId = request.cookies.sessionId
        if(!sessionId){
            sessionId = randomUUID()
            reply.cookie('sessionId',sessionId,{
                path:'/',
                maxAge: 60*60*24*7, //7 days
            })
        }
        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type == 'credit' ? amount : amount * -1 ,
            session_id: sessionId
        })
        return reply.status(201).send()
    })
    app.get('/',{preHandler:[ checkSessionIdExist ]},async(request,reply)=>{
        const {sessionId} = request.cookies
        const transactions = await knex('transactions').where('session_id',sessionId).select()
        return {transactions}
    })
    app.get('/:id', async(request)=>{
        const getTransactionsParamsSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = getTransactionsParamsSchema.parse(request.params)
        const transactions = await knex('transactions').where('id',id).first() 
        return {transactions}
    })
    app.get('/summary', async()=>{
        const summary = await knex('transactions').sum('amount',{as:'amount'}).first()
        return { summary }
    })
}