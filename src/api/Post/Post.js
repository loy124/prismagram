import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    // files: parent => prisma.post({ id: parent.id }).files(),
    // comments: parent => prisma.post({ id: parent.id }).comments(),
    // user: parent => prisma.post({ id: parent.id }).user(),
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(),
    likes: ({ id }) => prisma.post({ id }).likes(),
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count(),
    
  }
};
