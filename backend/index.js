import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

async function main() {
    const score = await prisma.score.findMany();
    console.log("test", score)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })