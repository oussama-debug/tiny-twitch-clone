import prisma from "@/library/database";
import { auth } from "@clerk/nextjs/server";
import slugify from "slugify";

type SetupChannelValues = { username: string };
export default async function setupChannel({ username }: SetupChannelValues) {
  const { userId } = auth();

  const newUser = await prisma.user.create({
    data: {
      user_id: userId!,
      name: username,
      channel: {
        create: {
          username: slugify(username.toLowerCase(), "_"),
          name: username,
        },
      },
    },
  });

  return newUser;
}
