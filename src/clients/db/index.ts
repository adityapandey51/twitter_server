import {PrismaClient} from "@prisma/client"

const Prisma = new PrismaClient({log:["query" , "error"]})

export default Prisma