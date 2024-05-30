import prisma from "@/library/database";

export async function getLatestChannels() {
  return await prisma.channel.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}
