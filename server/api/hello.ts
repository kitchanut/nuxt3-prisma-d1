import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

export interface Env {
    DB: D1Database
}

export default defineEventHandler(async (event) => {
    const adapter = new PrismaD1(event.context.cloudflare.env.DB)
    const prisma = new PrismaClient({ adapter })

    await prisma.user.create({
        data: {
            email: 'ff@gmail.com',
            name: 'Alice'
        }
    })

    const users = await prisma.user.findMany()
    const result = JSON.stringify(users)

    return result
})