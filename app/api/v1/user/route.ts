import { getUserProfileByClerkUserId } from "@/library/queries/user/get-user";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return Response.json(
      {
        data: null,
        code: 500,
        message: "User not found",
      },
      { status: 401 }
    );
  }
  const user = await getUserProfileByClerkUserId();
  if (!user) {
    return Response.json(
      { data: null, code: 500, message: "Something went wrong" },
      { status: 401 }
    );
  }

  return Response.json(
    { data: user, code: 200, message: "Successful fetching user" },
    { status: 200 }
  );
}
