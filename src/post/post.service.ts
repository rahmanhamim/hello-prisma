import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDB = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data: data,
    include: {
      author: true,
      category: true,
    },
  });

  return result;
};

const getAllPosts = async (options: Record<string, any>) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  const skip = page ? (Number(page) - 1) * (limit ? Number(limit) : 10) : 0;
  const take = limit ? Number(limit) : 10;

  const result = await prisma.post.findMany({
    skip,
    take,
    include: {
      author: true,
      category: true,
    },
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: "desc",
          },
    where: searchTerm
      ? {
          OR: [
            {
              title: { contains: searchTerm, mode: "insensitive" },
            },
            {
              author: {
                name: { contains: searchTerm, mode: "insensitive" },
              },
            },
          ],
        }
      : {},
  });

  return result;
};

export const PostService = {
  insertIntoDB,
  getAllPosts,
};
