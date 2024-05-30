import prisma from "@/library/database";
import { auth } from "@clerk/nextjs/server";

export async function getUserProfileByClerkUserId() {
  const { userId } = auth();
  if (!userId) return null;
  return await prisma.user.findUnique({
    where: { user_id: userId ?? "" },
    include: { channel: true, following: { include: { following: true } } },
  });
}

export async function getUserProfileById(id: string) {
  return await prisma.user.findUnique({
    where: { id: id ?? "" },
    include: { channel: true, following: { include: { following: true } } },
  });
}
