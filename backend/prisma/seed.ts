import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()
const salt = 11;
async function main() {

  const products= await prisma.listOfNames.createMany({
    data:[
      {
       name: "Anton",
      },
      {
        name: "Ivan",
       },
       {
        name: "Oleg",
       },
       {
        name: "Petro",
       },
       {
        name: "Vasyl",
       },
       {
        name: "Roman",
       }
    ]
  })
 console.log('seed file run');


}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })