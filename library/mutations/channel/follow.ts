import prisma from "@/library/database";
import { getUserProfileByClerkUserId } from "@/library/queries/user/get-user";

export default async function followChannel(channelId: string) {
  const user = await getUserProfileByClerkUserId();
  return await prisma.user.update({
    where: { id: user?.id! },
    data: {
      following: { create: { following: { connect: { id: channelId } } } },
    },
  });
}
