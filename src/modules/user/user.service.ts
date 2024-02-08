import { PrismaClient, User } from "@prisma/client";

const insertIntoDB = async (data: User): Promise<User> => {
  const prisma = new PrismaClient();

  const result = await prisma.user.create({
    data: data,
  });

  return result;
};

export const UserService = {
  insertIntoDB,
};
