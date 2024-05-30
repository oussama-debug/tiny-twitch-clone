import prisma from "@/library/database";
import { auth } from "@clerk/nextjs/server";
import slugify from "slugify";

type SetupChannelValues = { username: string; services: string[] };
export default async function setupChannel({
  username,
  services,
}: SetupChannelValues) {
  const { userId } = auth();

  const newUser = await prisma.user.create({
    data: {
      user_id: userId!,
      name: username,
      channel: {
        create: {
          username: slugify(username.toLowerCase(), "_"),
          name: username,
          tags: services,
        },
      },
    },
  });

  return newUser;
}
