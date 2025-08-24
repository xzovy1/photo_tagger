// import prisma from "./prisma/client.js";

import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();
async function main() {
<<<<<<< HEAD
    // const script = await prisma.scoreBoard.create({
    //     data: {
    //         name: "cS",
    //         score: 77.23
    //     }
    // });
    const script = await prisma.scoreBoard.deleteMany()
    console.log(script);
=======
  //   const script = await prisma.scoreBoard.create({
  //     data: {
  //       name: "cS",
  //       score: 77.233,
  //     },
  //   });
  const script = await prisma.scoreBoard.deleteMany();
  console.log(script);
>>>>>>> 8c636242cc92dab515ca8460f6a889fb5069cffa
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
