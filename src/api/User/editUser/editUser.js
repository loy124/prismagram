import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio }
      });

      //const user = await prisma.updateUser({
        // where: { id: user.id },
        // data: { username, email, firstName, lastName, bio }
      // });
      // return user 와 동일하다
    }
  }
};
