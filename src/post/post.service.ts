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

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
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

    const total = await tx.post.count();

    return {
      data: result,
      total,
    };
  });
};

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });

  return result;
};

export const PostService = {
  insertIntoDB,
  getAllPosts,
  updatePost,
  deletePost,
};
