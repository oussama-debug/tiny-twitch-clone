import { getSearchChannels } from "@/library/queries/channel/get-search";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url!);
  const channels = await getSearchChannels(searchParams.get("name") ?? "");

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
