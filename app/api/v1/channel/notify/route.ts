import { pusherServer } from "@/library/pusher";
import { getUniqueChannelById } from "@/library/queries/channel/get-unique";
import { resendClient } from "@/library/resend";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { ZodError, z } from "zod";

const notifyChannelInformationSchema = z.object({
  channelId: z.string(),
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
    const parse = notifyChannelInformationSchema.parse(body);

    const channel = await getUniqueChannelById(parse.channelId);
    const follows = channel?.followers;

    if (follows && follows.length > 0) {
      for (let follower of follows) {
        console.log(
          (await clerkClient.users.getUser(follower.follower.user_id))
            .primaryEmailAddress?.emailAddress!
        );
        await resendClient.emails.send({
          from: "oussama@jaaouani.com",
          to: (
            await clerkClient.users.getUser(follower.follower.user_id)
          ).primaryEmailAddress?.emailAddress!,
          subject: `New stream from @${channel.username}`,
          html: `<p>A new stream has started</p>`,
        });
      }
    }

    const follow = await pusherServer.trigger(parse.channelId, "new_stream", {
      channelName: `@${channel?.username}`,
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
