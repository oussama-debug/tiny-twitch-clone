import { pusherServer } from "@/library/pusher";
import { getUniqueChannelById } from "@/library/queries/channel/get-unique";
import { getUserProfileById } from "@/library/queries/user/get-user";
import { auth } from "@clerk/nextjs/server";
import moment from "moment";
import { NextRequest } from "next/server";
import { ZodError, z } from "zod";

const messageChannelInformationSchema = z.object({
  channelId: z.string(),
  message: z.string().min(1, "A minimum of 1 character is required"),
  userId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return Response.json(
        {
          data: null,
          code: 5001001,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parse = messageChannelInformationSchema.parse(body);

    const channel = await getUniqueChannelById(parse.channelId);
    const user = await getUserProfileById(parse.userId);

    const follow = await pusherServer.trigger(channel?.id!, "new_message", {
      message: parse.message,
      user: { id: parse.userId, name: user!.name },
      createdAt: moment().unix(),
    });

    return Response.json(
      { data: follow, code: 200, message: "Successful follow" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError)
      return Response.json(
        {
          data: error.message,
        },
        { status: 400 }
      );
    return Response.json(
      {
        data: null,
        code: 500,
        message: "Something went wrong while following channel.",
      },
      { status: 500 }
    );
  }
}
