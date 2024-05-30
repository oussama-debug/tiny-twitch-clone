import prisma from "@/library/database";
import { auth } from "@clerk/nextjs/server";

export async function getUserProfileByClerkUserId() {
  const { userId } = auth();
  return await prisma.user.findUnique({
    where: { user_id: userId ?? "" },
    include: { channel: true, following: { include: { following: true } } },
  });
}
