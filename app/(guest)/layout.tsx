import LandingHeader from "./(website)/_slices/header";
import LandingSidebar from "./(website)/_slices/sidebar";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col items-start min-h-screen">
      <LandingHeader />
      <div className="w-full flex flex-row justify-start items-start h-[calc(100dvh-55px)]">
        <LandingSidebar />
        <div className="flex-1 flex-col flex h-full">{children}</div>
      </div>
    </div>
  );
}
