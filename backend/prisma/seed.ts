import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()
//require('dotenv').config({path: '../.env'});
const salt = 11;//process.env.SALT as string;
async function main() {

  const admin = await prisma.userModel.upsert({
    where: {
      email: "andreytsiv@ukr.net"
    },
      update:{
          password: await hash('admin', salt),
      },
      create:{
        email: 'andreytsiv@ukr.net',
        password: await hash('admin', salt),
        name: 'Anton'
      }
  })

  const user = await prisma.userModel.upsert({
    where: {
      email: "user@greenton.com"
    },
      update:{
      password: await hash('user', salt),
    },
     create:{
    email: 'user@greenton.com',
    password: await hash('user', salt),
    name: 'user'
  }
  })

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