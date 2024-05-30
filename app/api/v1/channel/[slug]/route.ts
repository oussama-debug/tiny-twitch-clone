import { getUniqueChannelByUsername } from "@/library/queries/channel/get-unique";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params: { slug } }: { params: { slug?: string } }
) {
  const channels = await getUniqueChannelByUsername(slug!);

  if (!channels) {
    return Response.json(
      { data: null, code: 400, message: "Channels not found" },
      { status: 400 }
    );
  }

  return Response.json(
    { data: channels, code: 200, message: "Successful fetching channels" },
    { status: 200 }
  );
}
