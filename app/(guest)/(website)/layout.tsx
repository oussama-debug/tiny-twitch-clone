import { getUserProfileByClerkUserId } from "@/library/queries/user/get-user";
import { redirect } from "next/navigation";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getUserProfileByClerkUserId();
  const needSetup = !profile;

  if (needSetup) redirect("/streamer/setup");

  return <>{children}</>;
}
