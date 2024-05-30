import setupChannel from "@/library/mutations/channel/setup";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { ZodError, z } from "zod";

const postChannelInformationSchema = z.object({
  username: z.string().min(2, "A minimum of 4 characters is required"),
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
    const parse = postChannelInformationSchema.parse(body);

    const user = await setupChannel({
      username: parse.username,
    });

    return Response.json(
      { data: user, code: 200, message: "Successful setup" },
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
        message: "Something went wrong while setting up your channel.",
      },
      { status: 500 }
    );
  }
}
