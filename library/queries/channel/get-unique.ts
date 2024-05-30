import prisma from "@/library/database";

export async function getUniqueChannelByUsername(username: string) {
  return await prisma.channel.findUnique({
    where: { username: username },
    include: { followers: { include: { follower: true, following: true } } },
  });
}

export async function getUniqueChannelById(id: string) {
  return await prisma.channel.findUnique({
    where: { id },
    include: { followers: { include: { follower: true, following: true } } },
  });
}
