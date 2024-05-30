import prisma from "@/library/database";

export async function getUniqueChannelByUsername(username: string) {
  return await prisma.channel.findUnique({
    where: { username: username },
    include: { followers: { include: { follower: true, following: true } } },
  });
}
