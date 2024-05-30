import { getLatestChannels } from "@/library/queries/channel/get-latest";

export async function GET() {
  const channels = await getLatestChannels();

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
