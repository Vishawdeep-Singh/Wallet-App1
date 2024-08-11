import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function main() {
    const hashedPassword1= await bcrypt.hash("alice001",10)
    const hashedPassword2= await bcrypt.hash("bob001",10)
  // const alice = await prisma.user.upsert({
  //   where: { number: '1111111111' },
  //   update: {
  //     Balance:{
  //       create:{
  //         amount:20000,
  //         locked:0
  //       }
  //     }
  //   },
  //   create: {
  //     number: '1111111111',
  //     email:"alice22@gmail.com",
  //     password: hashedPassword1,
  //     name: 'alice',
  //     OnRampTransaction: {
  //       create: {
  //         startTime: new Date(),
  //         status: "Success",
  //         amount: 20000,
  //         token: "122434",
  //         provider: "HDFC Bank",
  //       },
  //     },
  //   },
  // })
  const bob = await prisma.user.upsert({
    where: { number: '2222222222' },
    update: {
      Balance:{
        create:{
          amount:200000,
          locked:0
        }
      }
    },
    create: {
      number: '2222222222',
      email:"bob123@gmail.com",
      password: hashedPassword2,
      name: 'bob',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "1234323",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({  bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()

  })