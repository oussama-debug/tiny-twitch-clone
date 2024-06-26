import followChannel from "@/library/mutations/channel/follow";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { ZodError, z } from "zod";

const followChannelInformationSchema = z.object({
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
    const parse = followChannelInformationSchema.parse(body);

    const follow = await followChannel(parse.channelId);

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
