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
  const { sortBy, sortOrder, searchTerm } = options;
  const result = await prisma.post.findMany({
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
