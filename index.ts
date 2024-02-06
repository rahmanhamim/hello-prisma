import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   const getAllUsers = await prisma.user.findMany();
  //   console.log(getAllUsers);

  const postUser = await prisma.user.create({
    data: {
      name: "Mezba",
      email: "mezba@gmail.com",
      age: 25,
    },
  });

  console.log(postUser);
}

main();
