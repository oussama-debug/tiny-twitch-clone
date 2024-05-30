import prisma from "@/library/database";

export async function getSearchChannels(name: string) {
  return await prisma.channel.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    where: { name: { contains: name } },
  });
}
