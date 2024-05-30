import { getUserProfileByClerkUserId } from "@/library/queries/user/get-user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth();
  const profile = await getUserProfileByClerkUserId();
  const needSetup = profile === null && user.userId;

  if (needSetup && user) redirect("/streamer/setup");

  return <>{children}</>;
}
